import { PlusCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { ColumnContainer } from "./ColumnContainer";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { Column, Id, Task } from "./Types";

export function KanbanBoard() {

    const [tasks, setTasks] = useState<Task[]>([])
    const [columns, setColumns] = useState<Column[]>([])
    const [activeColumn, setActiveColumn] = useState<Column | null>(null)

    const columnsId = useMemo(() => columns.map((col) => col.id),
        [columns]);

        const sensors = useSensors(useSensor(PointerSensor, {
            activationConstraint: {
                distance: 100 //100 px
            }
        }));

    function createColumns() {
        const columnToAdd: Column = {
            id: generateId(),
            title: `Column ${columns.length + 1}`
        }

        setColumns([...columns, columnToAdd])
    }

    function generateId() {
        /*Generate a random number for the id*/
        return Math.floor(Math.random() * 10001)
    }

    function deleteColumn(id: Id) {
        const filteredColumn = columns.filter(col => col.id !== id)
        setColumns(filteredColumn)
    }

    function updateColumn(id: Id, title: string){
        const newColumns = columns.map(col => {
            if (col.id !== id) return col;
            return {...col, title}
        })

        setColumns(newColumns)
    }

    function createTask(columnId: Id){
        const newTask: Task = {
            id: generateId(),
            columnId,
            content: `Task ${tasks.length + 1}`
        }

        setTasks([...tasks, newTask])
    }

    function deleteTask(id: Id) {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks)
    }

    function updateTask(id: Id, content: string){
        const newTasks = tasks.map(task => {
            if (task.id !== id) return task
            return {...task, content};
        })

        setTasks(newTasks)
    }

    function onDragStart(event: DragStartEvent) {
        // console.log("DRAG START", event)
        if (event.active.data.current?.type === "Column") {
            setActiveColumn(event.active.data.current.column)
            return
        }
    }

    function onDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (!over) return;

        const activeColumnId = active.id
        const overColumnId = over.id

        if (activeColumnId === overColumnId) return;

        setColumns((columns) => {
            const activeColumnIndex = columns.findIndex(
                (col) => col.id === activeColumnId
            );

            const overColumnIndex = columns.findIndex(
                (col) => col.id === overColumnId
            );

            return arrayMove(columns, activeColumnIndex, overColumnIndex)
        })
    }


    return (
        <>
            <div className="
        m-auto
        flex
        pt-5
        pb-5
        w-full
        items-center
        overflow-x-auto
        overflow-y-hidden
        px-[10px]
        ">
                <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
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
                                        tasks={tasks.filter((task)  => task.columnId === col.id)}
                                    />
                                ))}
                            </SortableContext>
                        </div>
                        <button
                            onClick={() => {
                                createColumns()
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
                        ring-blue-300
                        hover:ring-2
                        text-white
                        flex
                        gap-2
                        ">
                            <PlusCircle />
                            Add column
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
                                    tasks={tasks.filter((task)  => task.columnId === activeColumn.id)}
                                />
                            )}
                        </DragOverlay>,
                        document.body
                    )}
                </DndContext >
            </div >
        </>
    )
}
