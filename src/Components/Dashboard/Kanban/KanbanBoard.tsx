import { KanbanIcon, PlusIcon } from "lucide-react";
import { useEffect } from "react";
import { ColumnContainer } from "./ColumnContainer";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { TaskCard } from "./TaskCard";
import { useNotes } from "../../../Context/authContext";
import { useTranslation } from "react-i18next";


export function KanbanBoard() {
  const {
    getNotes,
    onDragStart,
    onDragEnd,
    onDragOver,
    columnsId,
    columns,
    deleteColumn,
    updateColumn,
    createTask,
    updateTask,
    deleteTask,
    tasks,
    createNewColumn,
    activeColumn,
    activeTask
  } = useNotes()

  useEffect(() => {
    getNotes()
  }, []);


  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const [t] = useTranslation("global")

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
      ring-red-300
      hover:ring-2
      flex
      gap-2
      "
          >
            <PlusIcon />
            <KanbanIcon/>
            {t("d-kanban.item2")}
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



}

