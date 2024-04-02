import { useTranslation } from "react-i18next";
import { CardsServices } from "./CardsServices";



interface Items {
    imgUrl: string;
    title: string;
    description: string;
}

export function Services() {

    const [t] = useTranslation("global");

    const SERVICES = [
        { imgUrl: 'https://img.freepik.com/free-photo/close-up-scientist-analysing-health-informations-tablet-while-specialist-sport-supervises-exercise-sportsman-monitoring-his-physical-endurance-examining-medical-scan-notepad-laboratory_482257-13199.jpg?size=626&ext=jpg&ga=GA1.2.1593590909.1707024521&semt=ais', title: t("s-services.item1.title"), description: t("s-services.item1.description") },
        { imgUrl: 'https://img.freepik.com/free-photo/face-recognition-personal-identification-collage_23-2150165604.jpg?size=626&ext=jpg&ga=GA1.2.1593590909.1707024521&semt=ais', title: t("s-services.item2.title"), description: t("s-services.item2.description") },
        { imgUrl: 'https://img.freepik.com/free-photo/team-doctors-standing-row_107420-84773.jpg?size=626&ext=jpg&ga=GA1.2.1593590909.1707024521&semt=ais', title: t("s-services.item3.title"), description: t("s-services.item3.description") },
        { imgUrl: 'https://img.freepik.com/free-photo/elder-adult-using-video-call-talk-doctor-about-treatment-home-senior-man-talking-specialist-about-health-care-remote-teleconference-telehealth-telemedicine_482257-39013.jpg?size=626&ext=jpg&ga=GA1.2.1593590909.1707024521&semt=ais', title: t("s-services.item4.title"), description: t("s-services.item4.description") }
    ];

    return (
        <section id="Services" className="max-w-[1200px] py-16 mx-auto">
            <h5 className="text-2xl font-semibold text-blue-700 text-center mb-10">{t("s-services.title")}</h5>

            <div className="bg-white lg:shadow-xl lg:shadow-slate-200/50">
                {SERVICES.map((item: Items) => (
                    <CardsServices
                        key={item.title}
                        imgUrl={item.imgUrl}
                        title={item.title}
                        description={item.description}
                    />
                ))}
            </div>
        </section>
    )
}