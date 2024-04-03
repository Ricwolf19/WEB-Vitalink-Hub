import {
    Card,
    CardBody,
    Typography,
    Button,
    CardFooter,
    CardHeader,
} from "@material-tailwind/react";
import { useFileStorage } from "../../../Context/authContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Trash2Icon } from "lucide-react";

export function Documents() {

    const { docsStorageList, uploadToStorage, deleteStorageFile } = useFileStorage();

    interface storageProps {
        url: string
        name: string
    }

    const [imgToUpload, setImgToUpload] = useState<any>(null);


    return (
        <>
            <div className="relative mt-8 h-28 w-full bg-white overflow-hidden rounded-xl bg-cover bg-center">
                <div className="absolute inset-0 h-full w-full bg-blue-900/35" />
            </div>
            <Card placeholder="" className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
                <CardBody placeholder="" className="p-4">
                    <div className="px-4 pb-4">
                        <Typography placeholder="" variant="h3" color="blue-gray" className="mb-2">
                            Digital Documents
                        </Typography>
                        <Typography
                            placeholder=""
                            variant="small"
                            className="font-normal text-blue-gray-500"
                        >
                            Pdfs, Words, Images and more...
                        </Typography>

                        <div className="mt-7 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
                            <div>
                                <div
                                    id="FileUpload"
                                    className="relative mb-8 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                                >
                                    <input
                                        type="file"
                                        onChange={(e) => setImgToUpload(e.target.files)}
                                        className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                                    />
                                    <div className="flex flex-col items-center justify-center space-y-2">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000g"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                                                    fill="#3C50E0"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                                                    fill="#3C50E0"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                                                    fill="#3C50E0"
                                                />
                                            </svg>
                                        </span>
                                        <p>
                                            <span className="text-primary">Click to upload</span>
                                        </p>
                                        <p className="mt-1.5">Pdf, Docs, Imgs...</p>
                                    </div>
                                </div>

                                <div className="flex justify-center gap-5">
                                    <Button placeholder="" onClick={() => uploadToStorage(imgToUpload)} variant="outlined" size="lg" className=" bg-white text-green-800 border-green-800">
                                        Upload File
                                    </Button>
                                </div>
                            </div>


                            {docsStorageList.map(
                                ({ url, name }: storageProps) => (
                                    <Card placeholder="" color="transparent" shadow={false} key={name}>
                                        <CardHeader
                                            placeholder=""
                                            floated={false}
                                            color="gray"
                                            className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                                        >
                                            <img
                                                src={'https://i.ibb.co/VDZ3HH6/5853.jpg' || url}
                                                alt={name}
                                                className="h-full w-full object-cover"
                                            />
                                        </CardHeader>
                                        <CardBody placeholder="" className="py-0 px-1 text-center">

                                            <Typography
                                                placeholder=""
                                                variant="h6"
                                                color="blue-gray"
                                                className="mt-1 mb-2"
                                            >
                                                {name}
                                            </Typography>

                                        </CardBody>
                                        <CardFooter placeholder="" className="mt-2 flex items-center justify-between py-0 px-1">
                                            {/* <Button placeholder="" onClick={() => downloadStorageFile(url)} variant="outlined" color="blue" size="sm">
                                                <DownloadCloud />
                                            </Button> */}
                                            <Link to={`${url}`}>
                                                <Button placeholder="" variant="outlined" color="purple" size="sm">
                                                    <Eye />
                                                </Button>
                                            </Link>
                                            <Button placeholder="" variant="outlined" color="red" size="sm" onClick={() => deleteStorageFile(name)}>
                                                <Trash2Icon />
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                )
                            )}
                        </div>
                    </div>
                </CardBody>
            </Card>
        </>
    );
}



