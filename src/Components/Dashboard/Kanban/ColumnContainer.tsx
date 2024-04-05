import { useSortable } from "@dnd-kit/sortable";
import { PlusCircle, Trash2Icon } from "lucide-react"
import { CSS } from "@dnd-kit/utilities"
import { useState } from "react";
import { Input } from "@nextui-org/react";
import { Column, Id, Task } from "./Types";
import { TaskCard } from "./TaskCard";

interface Props {
    column: Column;
    deleteColumn: (id: Id) => void;
    updateColumn: (id: Id, title: string) => void;
    updateTask: (id: Id, content: string) => void;
    createTask: (ColumnId: Id) => void;
    deleteTask: (id: Id) => void;
    tasks: Task[];
}

export function ColumnContainer(props: Props) {
    const { column, deleteColumn, updateColumn, createTask, tasks, deleteTask, updateTask } = props

    const [editMode, setEditMode] = useState(false);

    const { setNodeRef, attributes, listeners, transform, transition, isDragging }
        =
        useSortable({
            id: column.id,
            data: {
                type: "Column",
                column,
            },
            disabled: editMode
        })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="
        bg-column
         opacity-60
         border-2
         border-blue-300
        w-[350px]
        h-[500px]
        max-h-[500px]
        rounded-md
        flex
        flex-col
        " />
        )
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="
        bg-column
        w-[350px]
        h-[500px]
        max-h-[500px]
        rounded-md
        flex
        flex-col
        ">
            {/*Column TItle*/}
            <div
                {...attributes}
                {...listeners}
                onClick={() => {
                    setEditMode(true);
                }}
                className="
            bg-main
            text-md
            h-[60px]
            cursor-grab
            rounded-md
            rounded-b-none
            p-3
            font-bold
            border-column
            border-4
            flex
            text-white
            items-center
            justify-between
            ">
                <div className="flex gap-2">
                    <div
                        className="
                flex
                justify-center
                items-center
                text-white          
                px-2
                py-1
                text-sm
                rounded-full
                "
                    >
                        0
                    </div>

                    {/* {column.title} */}
                    {!editMode && column.title}
                    {editMode && (
                        <Input
                            variant="underlined"
                            color="primary"
                            className="  focus:border-blue-300 rounded outline-none px-2"
                            value={column.title}
                            onChange={e => updateColumn(column.id, e.target.value)}
                            autoFocus
                            onBlur={() => {
                                setEditMode(false)
                            }}
                            onKeyDown={(e) => {
                                if (e.key !== "Enter") return;
                                setEditMode(false)
                            }}
                        />
                    )}
                </div>

                <button
                    onClick={() => {
                        deleteColumn(column.id)
                    }}
                    className="
                stroke-gray-500
                hover:stroke-white
                hover:bg-column
                rounded
                px-1
                py-2
                ">
                    <Trash2Icon />
                </button>
            </div>

            {/*Column Task Container*/}
            <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto text-white">
               {tasks.map(task => (
                <TaskCard key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask}/>
               ))}
            </div>

            {/*Column Footer*/}
            <button onClick={() => {createTask(column.id)}} className="flex gap-2 items-center border-column border-2 rounded-md p-4 border-x-column hover:bg-main hover:text-blue-300 active:bg-black">
                <PlusCircle />Add Task
            </button>

        </div>
    )
}

