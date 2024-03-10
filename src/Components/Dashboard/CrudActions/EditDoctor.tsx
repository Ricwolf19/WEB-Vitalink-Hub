import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Input,
    Select,
    SelectItem,
    useDisclosure,
} from "@nextui-org/react";
import { selectOptionStatusDoctors, selectOptionsArea } from "../../../Data";
import { Logo } from "../../../Components/HomePage/Icons";
import { UserCog } from "lucide-react";
import { usePatientData } from "../../../Context/authContext";
import React from "react";


export function EditDoctor({ name, lastName, numCedula }: any) {
    const { patientData } = usePatientData();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [values, setValues] = React.useState(new Set([]));

    const handleSelectionChange = (e: any) => {
        setValues(new Set(e.target.value.split(",")));
    };

    return (
        <div>
            <Button onPress={onOpen} color="primary" variant="shadow" startContent={<UserCog />} className="font-semibold">Edit</Button>
            <Modal
                isOpen={isOpen}
                placement="auto"
                onOpenChange={onOpenChange}
                scrollBehavior={'inside'}
                classNames={{
                    body: "py-6",
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-red-600 text-center"><div className="pb-2 text-center flex-col flex gap-1"><Logo /></div>Edit Doctor</ModalHeader>
                            <ModalBody>
                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <Input label="Name" color="primary" placeholder={name} variant="faded" />
                                    <Input label="Last Name" color="primary" placeholder={lastName} variant="faded" />
                                </div>
                                {/* <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                      <Input label="Age" color="primary" placeholder={age} variant="faded" />
                                      <Input label="Birth Day" color="primary" placeholder={birthDate} variant="faded" />
                                    </div> */}

                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <Select
                                        label="Status"
                                        className="max-w-xs"
                                        variant="underlined"
                                        color="primary"
                                    >
                                        {selectOptionStatusDoctors.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.value}
                                            </SelectItem>
                                        ))}
                                    </Select>

                                    <Select
                                        label="Area"
                                        className="max-w-xs"
                                        variant="underlined"
                                        color="primary"
                                    >
                                        {selectOptionsArea.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.value}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>

                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <Input label="Num. Cedula" color="primary" placeholder={numCedula} variant="faded" />
                                </div>

                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <Select
                                        label="Select Patients"
                                        selectionMode="multiple"
                                        selectedKeys={values}

                                        onChange={handleSelectionChange}
                                    >
                                        {patientData.map((patient: any) => (
                                            <SelectItem key={patient.name} value={patient.name}>
                                                {`${patient.name}`}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    {/* <p className="text-small text-default-500">Selected: {Array.from(values).join(", ")}</p> */}
                                </div>

                                <div className="mt-4 text-right">
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={onClose}>
                                        Submit
                                    </Button>
                                </div>

                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}