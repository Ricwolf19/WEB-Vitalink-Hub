import { Card, CardBody, Typography } from "@material-tailwind/react";
import { KanbanBoard } from "../Kanban/KanbanBoard";

export function Kanban() {
    
    return (
        <>
            <div className="relative mt-8 h-28 w-full bg-white overflow-hidden rounded-xl bg-cover bg-center">
                <div className="absolute inset-0 h-full w-full bg-red-900/35" />
            </div>
            <Card placeholder="" className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
                <CardBody placeholder="" className="p-4">
                    <div className="px-4 pb-4">
                        <Typography placeholder="" variant="h3" color="blue-gray" className="mb-2">
                             Kanban Board
                        </Typography>
                        <KanbanBoard />
                    </div>
                </CardBody>
            </Card>
        </>
    )
}