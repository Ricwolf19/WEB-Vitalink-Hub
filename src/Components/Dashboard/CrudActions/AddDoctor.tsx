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
import { UserPlus } from "lucide-react";
import { useDoctorData, usePatientData } from "../../../Context/authContext";
import { useState } from "react";


export function AddDoctor() {
    const { patientData } = usePatientData();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { handleCreateDoctor } = useDoctorData()
    // const [values, setValues] = React.useState(new Set([]));

    const [newDcName, setNewDcName] = useState('');
    const [newDclastName, setNewDclastName] = useState('');
    const [newDcStatus, setNewDcStatus] = useState('');
    const [newDcArea, setNewDcArea] = useState('');
    const [newDcNumCedula, setNewDcNumCedula] = useState(0);
    const [newDcPatients, setNewDcPatients] = useState(['']);

    const handleSelectionPatients = (e: any) => {
        setNewDcPatients(e.target.value.split(","));
    };

    return (
        <div>
            <Button onPress={onOpen} color="success" variant="shadow" className="text-black" startContent={<UserPlus />}>Add</Button>
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
                            <ModalHeader className="flex flex-col gap-1 text-red-600 text-center"><div className="pb-2 text-center flex-col flex gap-1"><Logo /></div>Create Doctor</ModalHeader>
                            <ModalBody>
                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <Input label="Name" type="text" color="primary"  variant="faded" onChange={(e) => setNewDcName(e.target.value)}/>
                                    <Input label="Last Name" type="text" color="primary"  variant="faded" onChange={(e) => setNewDclastName(e.target.value)}/>
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
                                        onChange={(e) => setNewDcStatus(e.target.value)}
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
                                        onChange={(e) => setNewDcArea(e.target.value)}
                                    >
                                        {selectOptionsArea.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.value}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>

                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <Input label="Num. Cedula" type="number" color="primary" variant="faded" onChange={(e) => setNewDcNumCedula(e.target.valueAsNumber)} />
                                </div>

                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <Select
                                        label="Select Patients"
                                        selectionMode="multiple"
                                        onChange={handleSelectionPatients}
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
                                    <Button color="danger" variant="light" onPress={onClose} >
                                        Close
                                    </Button>
                                    <Button color="primary" onClick={() => handleCreateDoctor(newDcName, newDclastName, newDcArea, newDcNumCedula, newDcPatients, newDcStatus)} onPress={onClose} >
                                        Add Doctor
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