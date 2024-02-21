import { ContactUs } from "../Components/HomePage/ContactUs";
import { Footer } from "../Components/HomePage/Footer";
import { Hero } from "../Components/HomePage/Hero";
import { NavbarHome } from "../Components/HomePage/Navbar";
import { Objective } from "../Components/HomePage/Objective";
import { OurTeam } from "../Components/HomePage/OurTeam";
import { Services } from "../Components/HomePage/Services";

export function Home() {
    return (
        <div className=" bg-blue-50">
            <NavbarHome></NavbarHome>
            <Hero></Hero>
            <Objective></Objective>
            <Services></Services>
            <OurTeam></OurTeam>
            <br /><br />
            <ContactUs></ContactUs>
            <Footer></Footer>
        </div>
    )
}