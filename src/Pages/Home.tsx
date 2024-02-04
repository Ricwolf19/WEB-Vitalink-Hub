import { Hero } from "../Components/HomePage/Hero";
import { NavbarHome } from "../Components/HomePage/Navbar";

export function Home() {
    return (
        <div className=" bg-blue-50">
            <NavbarHome></NavbarHome>
            <Hero></Hero>
        </div>
    )
}