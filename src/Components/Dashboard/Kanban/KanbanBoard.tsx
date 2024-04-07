import { PlusIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ColumnContainer } from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { TaskCard } from "./TaskCard";
import { useAuth, useNotes } from "../../../Context/authContext";
import { Column, Id, Task } from "./Types";
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../Firebase";
import { v4 } from "uuid";


export function KanbanBoard() {
  const { user } = useAuth()
  const documentId = user.uid
  const { allCols, allTasks, KanbanBoardId } = useNotes()

  const [columns, setColumns] = useState<Column[]>(allCols);
  const [tasks, setTasks] = useState<Task[]>(allTasks);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const columnsId = useMemo(() => columns?.map(col => col.id) || [], [columns]);

  useEffect(() => {
    if (allCols && allTasks) {
      setColumns(allCols);
      setTasks(allTasks);
    }
  }, [allCols, allTasks]);

  const createTask = async (columnId: Id) => {
    const taskId = generateId();
    const newTask: Task = {
      id: taskId,
      columnId,
      content: `Task ${tasks.length + 1}`,
    };

    try {
      setTasks([...tasks, newTask]);

      const docRef = doc(db, 'accounts', documentId, 'notes', KanbanBoardId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const kanbanBoardData = docSnap.data();
        const updatedTasks = kanbanBoardData.AllTasks ? [...kanbanBoardData.AllTasks, newTask] : [newTask];

        await updateDoc(docRef, { AllTasks: updatedTasks });

      } else {
        await setDoc(docRef, { AllTasks: [newTask], AllCols: [] }); // Create new document with initial task
      }
    } catch (error) {
      console.error('Error adding new task: ', error);
    }
  }


  const deleteTask = async (id: Id) => {
    try {
      // Delete the task from the local state
      const newTasks = tasks.filter((task) => task.id !== id);
      setTasks(newTasks);

      // Update the AllTasks field in the Firestore database
      const docRef = doc(db, 'accounts', documentId, 'notes', KanbanBoardId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // Remove the deleted task from the AllTasks array
        const kanbanBoardData = docSnap.data();
        const updatedTasks = kanbanBoardData.AllTasks.filter((task: Task) => task.id !== id);

        // Update the AllTasks field in the KanbanBoard document
        await updateDoc(docRef, { AllTasks: updatedTasks });
        // console.log('Task deleted successfully.');
      } else {
        console.error('KanbanBoard document does not exist.');
      }
    } catch (error) {
      console.error('Error deleting task: ', error);
    }
  }

  const updateTask = async (id: Id, content: string) => {
    try {
      // Update the local state with the new content for the specific task
      const newTasks = tasks.map((task) => {
        if (task.id !== id) return task;
        return { ...task, content };
      });
      setTasks(newTasks);

      // Update the AllTasks field in the Firestore database
      const docRef = doc(db, 'accounts', documentId, 'notes', KanbanBoardId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const kanbanBoardData = docSnap.data();
        const updatedTasks = kanbanBoardData.AllTasks.map((task: Task) => {
          if (task.id !== id) return task;
          return { ...task, content };
        });

        // Update the AllTasks field in the KanbanBoard document
        await updateDoc(docRef, { AllTasks: updatedTasks });
        // console.log('Task content updated successfully.');
      } else {
        console.error('KanbanBoard document does not exist.');
      }
    } catch (error) {
      console.error('Error updating task content: ', error);
    }
  }


  const createNewColumn = async () => {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    try {
      const docRefAdd = collection(db, 'accounts', documentId, 'notes');
      const docRefSet = doc(db, 'accounts', documentId, 'notes', KanbanBoardId);
      const docSnap = await getDoc(docRefSet);
      if (docSnap.exists()) {
        const kanbanBoardData = docSnap.data();
        const updatedCols = kanbanBoardData.AllCols ? [...kanbanBoardData.AllCols, columnToAdd] : [columnToAdd];

        await updateDoc(docRefSet, { AllCols: updatedCols });
        setColumns([...columns, columnToAdd]);
      } else {
        await addDoc(docRefAdd, { AllCols: [], AllTasks: [] })
        await setDoc(docRefSet, { AllCols: [columnToAdd], AllTasks: [] }); // Create new document with initial column
      }
    } catch (error) {
      console.error('Error adding new column: ', error);
    }
  }

  const deleteColumn = async (id: Id) => {
    try {
      // Delete the column and associated tasks from the local state
      const filteredColumns = columns.filter((col) => col.id !== id);
      setColumns(filteredColumns);

      const newTasks = tasks.filter((t) => t.columnId !== id);
      setTasks(newTasks);

      // Update the AllCols and associated tasks in the Firestore database
      const docRef = doc(db, 'accounts', documentId, 'notes', KanbanBoardId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const kanbanBoardData = docSnap.data();

        // Filter out the deleted column from AllCols
        const updatedCols = kanbanBoardData.AllCols.filter((col: Column) => col.id !== id);
        const updatedTasks = kanbanBoardData.AllTasks.filter((task: Task) => task.columnId !== id);

        // Update the AllCols and AllTasks fields in the KanbanBoard document
        await updateDoc(docRef, { AllCols: updatedCols, AllTasks: updatedTasks });
        // console.log('Column and associated tasks deleted successfully.');
      } else {
        console.error('KanbanBoard document does not exist.');
      }
    } catch (error) {
      console.error('Error deleting column: ', error);
    }
  }

  const updateColumn = async (id: Id, title: string) => {
    try {
      // Update the local state with the new title for the specific column
      const newColumns = columns.map((col) => {
        if (col.id !== id) return col;
        return { ...col, title };
      });
      setColumns(newColumns);

      // Update the AllCols field in the Firestore database
      const docRef = doc(db, 'accounts', documentId, 'notes', KanbanBoardId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const kanbanBoardData = docSnap.data();
        const updatedCols = kanbanBoardData.AllCols.map((col: Column) => {
          if (col.id !== id) return col;
          return { ...col, title };
        });

        // Update the AllCols field in the KanbanBoard document
        await updateDoc(docRef, { AllCols: updatedCols });
        // console.log('Column title updated successfully.');
      } else {
        console.error('KanbanBoard document does not exist.');
      }
    } catch (error) {
      console.error('Error updating column title: ', error);
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );


  return (
    <div
      className="
        m-auto
        flex
        pb-5
        pt-5
        w-full
        items-center
        text-white
        overflow-x-auto
        overflow-y-hidden
        px-[40px]
    "
    >
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={() => {
              createNewColumn();
            }}
            className="
      h-[60px]
      w-[350px]
      min-w-[350px]
      cursor-pointer
      rounded-lg
      bg-main
      border-2
      border-column
      p-4
      ring-blue-500
      hover:ring-2
      flex
      gap-2
      "
          >
            <PlusIcon />
            Add Column
          </button>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );


  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    // Reset the active item
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    // Early return if there's no 'over' target or if the item is dropped onto itself
    if (!over || active.id === over.id) return;

    // Handle Column reordering if applicable
    if (active.data.current?.type === "Column") {
      const updatedColumns = arrayMove(
        columns,
        columns.findIndex((col) => col.id === active.id),
        columns.findIndex((col) => col.id === over.id)
      );
      setColumns(updatedColumns);
      updateColumnPositions(updatedColumns); // Updates column positions in Firestore
      return;
    }

    // Extract the target column's ID more flexibly
    let targetColumnId;
    if (over.data.current?.type === "Column") {
      targetColumnId = over.id;
    } else if (over.data.current?.type === "Task") {
      const targetTask = tasks.find(task => task.id === over.id);
      targetColumnId = targetTask ? targetTask.columnId : undefined;
    }

    if (targetColumnId) {
      handleTaskReorderingAndMoving(active.id, targetColumnId);
    }
  }


  async function handleTaskReorderingAndMoving(draggedId: any, targetColumnId: any) {
    const draggedTask = tasks.find(task => task.id === draggedId);

    // Return early if the draggedTask is undefined
    if (!draggedTask) return;

    let updatedTasks = [...tasks];
    if (draggedTask.columnId !== targetColumnId) {
      // Simply move task to new column if different from the current one
      updatedTasks = updatedTasks.map(task =>
        task.id === draggedId ? { ...task, columnId: targetColumnId } : task
      );
    }

    setTasks(updatedTasks);
    await updateTaskPositions(updatedTasks); // Updates tasks positions and columns in Firestore
  }


  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask || !isOverATask) return;

    setTasks((tasks) => {
      const activeIndex = tasks.findIndex((t) => t.id === activeId);
      const overIndex = tasks.findIndex((t) => t.id === overId);

      let updatedTasks: Task[];

      if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
        tasks[activeIndex].columnId = tasks[overIndex].columnId;
        updatedTasks = arrayMove(tasks, activeIndex, overIndex - 1);
      } else {
        updatedTasks = arrayMove(tasks, activeIndex, overIndex);
      }

      return updatedTasks;
    });

    const updatedTasks = tasks; 

    // Update the positions of the tasks in the Firestore database
    updateTaskPositions(updatedTasks);
  }

  async function updateColumnPositions(updatedColumns: Column[]) {
    const docRef = doc(db, 'accounts', documentId, 'notes', KanbanBoardId);
    await updateDoc(docRef, { AllCols: updatedColumns });
  }

  async function updateTaskPositions(updatedTasks: Task[]) {
    const docRef = doc(db, 'accounts', documentId, 'notes', KanbanBoardId);
    await updateDoc(docRef, { AllTasks: updatedTasks });
  }

  function generateId() {
    return v4();
  }


}

