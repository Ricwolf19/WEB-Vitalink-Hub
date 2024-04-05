import { useTranslation } from "react-i18next";
import ModalContacUs from "../HomePage/ModalContactUs";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";


export function Hero() {
    const [t] = useTranslation("global");

    return (
        <section className=" max-w-screen-xl flex flex-col-reverse gap-12 items-center mx-auto py-16 px-6 md:flex-row ">
            <div className=" flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold text-gradient mb-3 md:text-4xl md:leading-[3rem] lg:text-5xl lg:leading-[4rem]"> {t("s-hero.item1")}</h2>

                <p className=" text-lg leading-6 text-blue-800 mb-6 md:w-4/5">
                    {t("s-hero.item2")}
                </p>
                <div className="flex">
                    <ModalContacUs />
                    <Popover
                        showArrow
                        backdrop="opaque"
                        placement="right"
                        classNames={{
                            base: [
                                // arrow color
                                "before:bg-default-200"
                            ],
                            content: [
                                "py-3 px-4 border border-default-200",
                                "bg-gradient-to-br from-white to-default-300",
                                "dark:from-default-100 dark:to-default-50",
                            ],
                        }}
                    >
                        <PopoverTrigger>
                            <Button className="ml-7" color="secondary">{t("s-hero.itemFree.button")}</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            {(titleProps) => (
                                <div className="px-1 py-2">
                                    <h3 className="text-small font-bold text-center pb-5 text-red-800" {...titleProps}>
                                        {t("s-hero.itemFree.title")}
                                    </h3>
                                    <div className="text-center">
                                        <p className="text-tiny text-blue-900 font-sans "><span className="uppercase text-red-800 font-bold pr-0.5">{t("s-hero.itemFree.text1")}</span> vitalink@gmail.com</p>
                                        <p className="text-tiny pb-5 text-blue-900 font-sans"><span className="uppercase text-red-800 font-bold pr-0.5">{t("s-hero.itemFree.text2")}</span> 12345678</p>
                                        <p className=" text-blue-900 font-bold">{t("s-hero.itemFree.text3")}</p>
                                    </div>
                                </div>
                            )}
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div className="flex gap-2 justify-center md:gap-3 lg:gap-5">
                <img className="hero-img" src="https://i.ibb.co/sbznqsf/part-1-img.jpg" alt="img1" />
                <img className="mt-[5%] hero-img" src="https://i.ibb.co/PZFcHTX/part-2-img.jpg" alt="img2" />
                <img className="hero-img" src="https://i.ibb.co/7vGs1G2/part-3-img.jpg" alt="img3" />
            </div>

        </section>
    )
}