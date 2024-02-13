import { ChevronFirst, MoreVertical } from "lucide-react";


export function SideBar({ }) {
    return (
        <aside className="h-screen">
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">

                <div className="p-4 pb-2 flex justify-between items-center">
                    <img
                        src="/logo-rbg.png"
                        alt="logo"
                        className="w-16" />
                    <button className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                        <ChevronFirst />
                    </button>
                </div>

                <ul className="flex-1 px-3"></ul>

                <div className="border-t flex p-3">
                    <img
                        src="/user-icon.jpg"
                        alt="avatar"
                        className="w-10 h-10 rounded-md"
                    />
                    <div className={`flex justify-between items-center w-52 ml-3`}>
                        <div className="leading-4">
                            <h4 className=" font-semibold">Ricardo T</h4>
                            <span className="text-xs text-gray-600">rhtc@gmail.com</span>
                        </div>
                        <MoreVertical />
                    </div>
                </div>
            </nav>
        </aside>
    )
}

// export function SideBarItem({icon, text, active, alert}) {
//     return (
//         <li>
//             {icon}
//             <span>{text}</span>
//         </li>
//     )
// }