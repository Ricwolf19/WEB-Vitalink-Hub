import { Hero } from "../Components/HomePage/Hero";
import { Navbar } from "../Components/HomePage/Navbar";

export function Home() {
    return (
        <div className=" bg-blue-50">
            <Navbar />
            <Hero></Hero>
        </div>
    )
}