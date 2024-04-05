import { useSortable } from "@dnd-kit/sortable";
import { Trash2Icon } from "lucide-react"
import { CSS } from "@dnd-kit/utilities"

interface Props {
    column: Column;
    deleteColumn: (id: Id) => void
}

export function ColumnContainer(props: Props) {
    const { column, deleteColumn } = props


    const { setNodeRef, attributes, listeners, transform, transition, isDragging }
        =
        useSortable({
            id: column.id,
            data: {
                type: "Column",
                column,
            },
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
                    <div className="
                flex
                justify-center
                items-center
                text-white
                bg-column
                px-2
                py-1
                text-sm
                rounded-full
                ">0</div>
                    {column.title}
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
            <div className="flex flex-grow  text-white">
                Content
            </div>

            {/*Column Footer*/}
            <div className=" text-white">
                Footer
            </div>

        </div>
    )
}

