 import { useState } from "react";
 import logo from "../../assets/logo-rbg.png"
 import { RiMenu4Fill, RiCloseFill } from "react-icons/ri";
 import { MobileNavbar } from "./MovileNavbar";;

export function Navbar() {

    const [IsMenuOpen, setIsMenuOpen] = useState(true);

    const toggleMenu = () => {
        setIsMenuOpen(!IsMenuOpen);
    };

    return (
        <>
        {IsMenuOpen && <MobileNavbar setIsMenuOpen={setIsMenuOpen} />}

        <div className=" bg-blue-50 sticky top-0 z-10">
            <nav className="max-w-screen-xl mx-auto py-4 px-6">
                <div className="flex items-center justify-between">

                <img src={logo} alt="logo" className=" h-11 w-auto object-contain"/>
                <ul className=" hidden md:flex md:gap-14">
                    <li><a className="menu-item">Home</a></li>
                    <li><a className="menu-item">Services</a></li>
                    <li><a className="menu-item">Our Work</a></li>
                    <li><a className="menu-item">About Us</a></li>
                </ul>

                <button className=" hidden h-10 bg-blue-600 text-white text-lg px-6 rounded hover:bg-blue-200 hover:text-blue-600 md:block">Login</button>

                {/*Tooggle menu function*/}
                <button onClick={() => {toggleMenu()}} className="w-11 h-11 bg-blue-100 text-2xl text-blue-600 flex items-center justify-center rounded md:hidden z-50">
                { IsMenuOpen ? <RiCloseFill /> : <RiMenu4Fill />}
                </button>

                </div>
            </nav>
        </div>
        </>
    )
}