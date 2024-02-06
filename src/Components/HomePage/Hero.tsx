import ModalContacUs  from "../HomePage/ModalContactUs";
import HeroIMG1 from "../../assets/part-1-img.jpg"
import HeroIMG2 from "../../assets/part-2-img.jpg"
import HeroIMG3 from "../../assets/part-3-img.jpg"

export function Hero() {
    return (
        <section className=" max-w-screen-xl flex flex-col-reverse gap-12 items-center mx-auto py-16 px-6 md:flex-row ">
            <div className=" flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold text-gradient mb-3 md:text-4xl md:leading-[3rem] lg:text-5xl lg:leading-[4rem]">Smart Health, Smarter Living</h2>

                <p className=" text-lg leading-6 text-blue-800 mb-6 md:w-4/5">
                "Elevate Your Health with VitaLink: Smart Monitoring, Real Results."
                </p>
                <div className="">
                <ModalContacUs/>
                </div>
            </div>

            <div className="flex gap-2 justify-center md:gap-3 lg:gap-5">
                <img className="hero-img" src={HeroIMG1} alt="img1" />
                <img className="mt-[5%] hero-img" src={HeroIMG2} alt="img2" />
                <img className="hero-img" src={HeroIMG3} alt="img3" />
            </div>

        </section>
    )
}