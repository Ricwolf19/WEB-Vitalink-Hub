 import logo from "../assets/logo.jpg"

export function Navbar() {
    return (
        <div>
            <nav>
                <div>
                <img src={logo} alt="logo" className=" h-11 w-auto object-contain"/>
                </div>
            </nav>
        </div>
    )
}