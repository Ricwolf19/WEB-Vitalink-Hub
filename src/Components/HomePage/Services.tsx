import { CardsServices } from "./CardsServices";

const SERVICES = [
    { imgUrl: 'https://img.freepik.com/free-photo/close-up-scientist-analysing-health-informations-tablet-while-specialist-sport-supervises-exercise-sportsman-monitoring-his-physical-endurance-examining-medical-scan-notepad-laboratory_482257-13199.jpg?size=626&ext=jpg&ga=GA1.2.1593590909.1707024521&semt=ais', title: 'Smart Health Insights', description: 'Unlock smart insights into your health with VitaLink. Our SensorPath technology delivers real-time data, providing a comprehensive view of your well-being. Receive personalized health recommendations based on advanced analytics, empowering you to make informed decisions for a healthier lifestyle.' },
    { imgUrl: 'https://img.freepik.com/free-photo/face-recognition-personal-identification-collage_23-2150165604.jpg?size=626&ext=jpg&ga=GA1.2.1593590909.1707024521&semt=ais', title: 'Connected Wellness', description: 'Embark on a journey to wellness like never before with VitaLink. Our innovative SensorPath technology establishes a seamless connection between you and your healthcare. From real-time health monitoring to personalized wellness plans, VitaLink ensures a holistic approach to your well-being, making health management an integrated and effortless experience.' },
    { imgUrl: 'https://img.freepik.com/free-photo/team-doctors-standing-row_107420-84773.jpg?size=626&ext=jpg&ga=GA1.2.1593590909.1707024521&semt=ais', title: 'Empowering Healthcare Professionals', description: 'VitaLink goes beyond monitoring – it empowers healthcare professionals with actionable insights. By utilizing our SensorPath technology, doctors and specialists gain a comprehensive understanding of patient health in real time. Join us in revolutionizing healthcare delivery, fostering collaboration, and building a brighter and healthier future for all.' },
    { imgUrl: 'https://img.freepik.com/free-photo/elder-adult-using-video-call-talk-doctor-about-treatment-home-senior-man-talking-specialist-about-health-care-remote-teleconference-telehealth-telemedicine_482257-39013.jpg?size=626&ext=jpg&ga=GA1.2.1593590909.1707024521&semt=ais', title: 'User-Friendly Health Monitoring', description: 'VitaLink redefines health monitoring, making it user-friendly and accessible. With our SensorPath technology, effortlessly track vital signs, access personalized health insights, and take control of your well-being through an intuitive and easy-to-use platform. Experience a new standard in health management designed with you in mind.' }
];

interface Items {
    imgUrl: string;
    title: string;
    description: string;
}

export function Services() {

    return (
        <section id="Services" className="max-w-[1200px] py-16 mx-auto">
            <h5 className="text-2xl font-semibold text-blue-700 text-center mb-10">Our Services</h5>

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