import logo from "../../assets/logo-rbg.png"

//Intefaz para poder declarar el estado de la navbar de movile como boolean
interface MovileNavbarProps {
    setIsMenuOpen: (value: boolean) => void
}

export function MobileNavbar({ setIsMenuOpen }: MovileNavbarProps) {
    return (
        <div className="w-screen fixed top-0 z-20">
            <div className=" w-1/2 h-screen flex flex-col p-8 bg-blue-100">
                <img src={logo} alt="logo" className="w-16 object-contain mb-8" />

                <ul>
                    <li className="mb-5"><a className="menu-item">Home</a></li>
                    <li className="mb-5"><a className="menu-item">Services</a></li>
                    <li className="mb-5"><a className="menu-item">Our Work</a></li>
                    <li className="mb-5"><a className="menu-item">About Us</a></li>
                </ul>

                <button className="h-10 bg-blue-700 text-white text-sm px-6 rounded hover:bg-blue-200 hover:text-blue-700 md:block">Login</button>
            </div>

            {/*Backdrop-brightness is for blend mode */}
            <div onClick={() => { setIsMenuOpen(false) }} className="w-screen h-screen backdrop-brightness-50 fixed top-0 -z-10"></div>
        </div>
    )
}