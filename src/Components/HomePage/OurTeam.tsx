import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RicardoT from "../../Assets/RicardoT-img.jpg"
import BrandonC from "../../Assets/BrandonC-img.jpg"
import AntonioR from "../../Assets/AntonioR-img.jpg"
import CesarO from "../../Assets/CesarO-img.jpg"

//Interface of arrow for better practice
interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

function NextArrow(props: ArrowProps) {
  const { className, style, onClick } = props;
  return (
    <FaChevronRight
      className={`next-arrow ${className}`}
      style={{ ...style, display: "block", color: "blue", fontSize: "30px" }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props: ArrowProps) {
  const { className, style, onClick } = props;
  return (
    <FaChevronLeft
      className={`prev-arrow ${className}`}
      style={{ ...style, display: "block", color: "blue", fontSize: "30px" }}
      onClick={onClick}
    />
  );
}

export function OurTeam() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <section>
        <div className="container mx-auto px-4 py-10 bg-white">
            <div className="text-center">
                <Slider {...settings}>
                    <div className="card p-4 bg-white rounded shadow-lg">
                        <img
                            src={RicardoT}
                            alt="RicardoT"
                            className="w-full h-[390px] object-cover rounded-t"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-bold mb-2">
                                Ricardo Humberto Tapia Chavez
                            </h3>
                            <p className="text-gray-700">TID51M</p>
                        </div>
                    </div>
                    <div className="card p-4 bg-white rounded shadow-lg">
                        <img
                            src={BrandonC}
                            alt="BrandonC"
                            className="w-full h-[390px] object-cover rounded-t"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-bold mb-2">
                                Brandon Daniel Chacón Campos
                            </h3>
                            <p className="text-gray-700">TID51M</p>
                        </div>
                    </div>
                    <div className="card p-4 bg-white rounded shadow-lg">
                        <img
                            src={AntonioR}
                            alt="JoseR"
                            className="w-full h-[390px] object-cover rounded-t"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-bold mb-2">
                                José Antonio Rosales Maldonado
                            </h3>
                            <p className="text-gray-700">TID51M</p>
                        </div>
                    </div>
                    <div className="card p-4 bg-white rounded shadow-lg">
                        <img
                            src={CesarO}
                            alt="CesarO"
                            className="w-full h-[390px] object-cover rounded-t"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-bold mb-2">
                                César Gabriel Orozco Torres
                            </h3>
                            <p className="text-gray-700">TID51M</p>
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
    </section>
    );
}