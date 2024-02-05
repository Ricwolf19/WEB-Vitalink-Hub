interface CardServicesProps {
    imgUrl: string;
    title: string;
    description: string;
}

export function CardsServices({ imgUrl, title, description }: CardServicesProps) {
    return (
        <div className=" bg-blue-100 flex flex-col md:even:flex-row-reverse md:odd:flex-row">
            <div className="flex-1">
                <img src={imgUrl} alt="img" className="w-full h-80 md:h-full" />
            </div>

            <div className="flex-1">
                <div className="p-10">
                    <h6 className="text-md md:text-xl text-blue-800 font-bold mb-3">{title}</h6>
                    <p className="text-md md:text-md leading-6 text-blue-800 whitespace-pre-line text-justify">{description}</p>
                </div>
            </div>
        </div>
    );
}
