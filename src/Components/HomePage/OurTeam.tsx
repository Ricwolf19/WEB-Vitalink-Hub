// import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//Interface of arrow for better practice
// interface ArrowProps {
//     className?: string;
//     style?: React.CSSProperties;
//     onClick?: () => void;
// }

// function NextArrow(props: ArrowProps) {
//     const { className, style, onClick } = props;
//     return (
//         <FaChevronRight
//             className={`next-arrow ${className}`}
//             style={{ ...style, display: "block", color: "blue", fontSize: "30px" }}
//             onClick={onClick}
//         />
//     );
// }

// function PrevArrow(props: ArrowProps) {
//     const { className, style, onClick } = props;
//     return (
//         <FaChevronLeft
//             className={`prev-arrow ${className}`}
//             style={{ ...style, display: "block", color: "blue", fontSize: "0px" }}
//             onClick={onClick}
//         />
//     );
// }

export function OurTeam() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
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
                    slidesToShow: 1
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
        <section id="OurTeam">
            <div className="max-w-[1200px] mx-auto">
                <h5 className="text-2xl font-semibold text-blue-700 text-center mb-10">Our Team</h5>
                <div className="text-center">
                    <Slider {...settings}>
                        <div className="card p-4  rounded ">
                            <img
                                src="https://i.ibb.co/n3ZnS95/Ricardo-T-img.jpg"
                                alt="RicardoT"
                                className="w-full h-[400px] object-cover rounded"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-blue-900 text-center">
                                    Ricardo Humberto Tapia Chavez
                                </h3>
                            </div>
                        </div>
                        <div className="card p-4 rounded ">
                            <img
                                src="https://i.ibb.co/hcW19q7/Brandon-C-img.jpg"
                                alt="BrandonC"
                                className="w-full h-[400px] object-cover rounded"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-blue-900 text-center ">
                                    Brandon Daniel Chacón Campos
                                </h3>
                            </div>
                        </div>
                        <div className="card p-4 rounded ">
                            <img
                                src="https://i.ibb.co/YLwng7n/Antonio-R-img.jpg"
                                alt="JoseR"
                                className="w-full h-[400px] object-cover rounded"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-blue-900 text-center ">
                                    José Antonio Rosales Maldonado
                                </h3>
                            </div>
                        </div>
                        <div className="card p-4 rounded ">
                            <img
                                src="https://i.ibb.co/wYJZhBx/Cesar-O-img.jpg"
                                alt="CesarO"
                                className="w-full h-[400px] object-cover rounded"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-blue-900 text-center ">
                                    César Gabriel Orozco Torres
                                </h3>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        </section>
    );
}