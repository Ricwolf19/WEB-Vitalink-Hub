import { SERVICES } from "../../utils/DataHome";
import { CardsServices } from "./CardsServices";

export function Services(){
    return(
        <section className="max-w-[1200px] py-16 mx-auto">
            <h5 className="text-2xl font-semibold text-blue-700 text-center mb-10">Our Services</h5>

            <div className="bg-white lg:shadow-xl lg:shadow-slate-200/50">
                {SERVICES.map((item) => (
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