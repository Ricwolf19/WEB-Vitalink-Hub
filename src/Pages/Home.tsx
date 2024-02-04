import { Hero } from "../Components/HomePage/Hero";
import { NavbarHome } from "../Components/HomePage/Navbar";
import { Services } from "../Components/HomePage/Services";

export function Home() {
    return (
        <div className=" bg-blue-50">
            <NavbarHome></NavbarHome>
            <Hero></Hero>
            <Services></Services>
        </div>
    )
}