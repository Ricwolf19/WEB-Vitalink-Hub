import { Image } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

export function Objective() {
    const [t] = useTranslation("global");
    
    return (
        <section id="Objective" className="max-w-[1200px] flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between lg:items-stretch mx-auto lg:gap-10 lg:p-6">
            <div className="flex-1 order-2 lg:order-1 mb-8 lg:mb-0">
                <div className="p-2">
                    <Image
                        width={550}
                        height={550}
                        alt="NextUI hero Image with delay"
                        src="https://img.freepik.com/free-vector/healthcare-background-with-medical-symbols-hexagonal-frame_1017-26363.jpg?size=626&ext=jpg&ga=GA1.1.1593590909.1707024521&semt=sph"
                        className="object-cover w-full lg:w-auto h-auto lg:h-full"
                    />
                </div>
            </div>
            <div className="flex-1 order-1 lg:order-2">
                <div className="max-w-xl">
                    <div className="p-5">
                        <h2 className="font-palanquin text-4xl lg:text-5xl font-bold text-center lg:text-left capitalize">
                        {t("s-objective.item1")} <span className="text-blue-800">{t("s-objective.item2")}</span>
                        </h2>
                        <p className="mt-4 info-text lg:max-w-lg text-justify lg:text-justify">
                        {t("s-objective.item3")}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}


