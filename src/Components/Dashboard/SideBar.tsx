import { ReactNode, createContext, useContext, useState } from "react";
import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";


interface SideBarProps {
    children: ReactNode; // Agregamos children a los props
}

const SideBarContext = createContext({ expanded: true }); // Proporciona un valor predeterminado

export function SideBar({ children }: SideBarProps) {
    const [expanded, setExpanded] = useState(false)
    return (
        <aside className={`h-screen ${expanded ? "w-64" : "w-16"}`}>
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img
                        src="/logo-rbg.png"
                        alt="logo"
                        className={`overflow-hidden transition-all ${expanded ? "w-9" : "w-0"}`} />
                    <button onClick={() => setExpanded(curr => !curr)} className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100">
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>

                <SideBarContext.Provider value={{ expanded }}>

                    <ul className="flex-1 px-3">{children}</ul>

                </SideBarContext.Provider>

                <div className="border-t flex p-3">
                    <img src="/user-icon.jpg" alt="avatar" className="w-10 h-10 rounded-md" />
                    <Link to="/user/profile" className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
                        <div className="leading-4">
                            <h4 className="font-semibold">Ricardo T</h4>
                            <span className="text-xs text-gray-600">rhtc@gmail.com</span>
                        </div>
                        <MoreVertical size={20} />
                    </Link>
                </div>
            </nav>
        </aside>
    );
}


export function SideBarItem({ icon, text, active, alert, to }: any) {
    const { expanded } = useContext(SideBarContext);

    const navigate = useNavigate();

    const handleClick = () => {
        if (to) {
            navigate(to);
        }
    }

    return (
        <li onClick={handleClick} className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? "bg-red-200 text-red-800" : "hover:bg-red-50"}`}>
            {icon}
            <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
                }`}>
                {text}
            </span>
            {alert && (
                <div className={`absolute right-2 w-2 h-2 rounded bg-red-400 
            ${expanded ? "" : "top-2"}`} />
            )}

            {!expanded && (
                <div
                    className={`
                absolute left-full rounded-md px-2 py-1 ml-6 
                bg-red-100 text-red-800 text-sm invisible opacity-20 
                -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                `}>
                    {text}
                </div>
            )}
        </li>
    );
}
