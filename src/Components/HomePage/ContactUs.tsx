import ModalContactUs from "./ModalContactUs"
import { Image } from "@nextui-org/react";

export function ContactUs() {
    return (
        <section id="ContactUs">
            <div className="bg-blue-50">
                <div className="max-w-[1200px] py-10 h-auto mx-auto flex flex-col items-start md:h-[400px] md:flex-row min-[1090px]:h-[320px]">
                    <Image
                        width={1600}
                        height={1000}
                        alt="NextUI hero Image with delay"
                        src="https://img.freepik.com/premium-photo/words-with-contact-us-business-concept-idea_352439-357.jpg?size=626&ext=jpg&ga=GA1.2.1593590909.1707024521&semt=ais"
                    />

                    <div className="p-6">
                        <h5 className="text-lg font-bold text-blue-800 mb-2 lg:mb-4">Contact Us</h5>

                        <p className=" text-lx text-blue-800 leading-6 text-justify mb-5">
                            "Have questions or need assistance? Feel free to reach out to us. Our dedicated team at VitaLink is here to provide support and answer any inquiries you may have. Your health and satisfaction are our priorities. Contact VitaLink today for a connected and personalized healthcare experience."
                        </p>

                        <ModalContactUs></ModalContactUs>
                    </div>
                </div>
            </div>
        </section>

    )
}