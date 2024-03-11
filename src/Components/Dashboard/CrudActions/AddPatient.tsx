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
    Chip as ChipNextUi,
} from "@nextui-org/react";
import { selectOptionStatusPatients, selectOptionsAllergies, selectOptionsArea, selectOptionsBloodType, selectOptionsChronicDiseases } from "../../../Data";
import { Logo } from "../../HomePage/Icons";
import { UserPlus } from "lucide-react";
import { useDoctorData } from "../../../Context/authContext";
import React, { useState } from "react";

export function AddPatient() {
    const { doctorData } = useDoctorData()
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [values, setValues] = React.useState(new Set([]));

    const [newPtName, setNewPtName] = useState('');
    const [newPtlastName, setNewPtlastName] = useState('');
    const [newPtStatus, setNewPtStatus] = useState(true);
    const [newPtArea, setNewPtArea] = useState('');
    const [newPtChronicDiseases, setNewPtChronicDiseases] = useState(['']);
    const [newPtAllergies, setNewPtAllergies] = useState(['']);
    const [newPtBloodType, setNewPtBloodType] = useState('');
    const [newPtBirhDay, setNewPtBirhDay] = useState('');
    const [newPtAge, setNewPtAge] = useState(0);
    const [newPtDoctorAssigned, setNewPtDoctorAssigned] = useState('');

    const handleSelectionChange = (e: any) => {
        setValues(new Set(e.target.value.split(",")));
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
                            <ModalHeader className="flex flex-col gap-1 text-red-600 text-center"><div className="pb-2 text-center flex-col flex gap-1"><Logo /></div>Create Patient</ModalHeader>
                            <ModalBody>
                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <Input label="Name" color="primary" type="text"  variant="faded" onChange={(e) => setNewPtName(e.target.value)} />
                                    <Input label="Last Name" color="primary" type="text"  variant="faded" />
                                </div>
                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <Input label="Age" color="primary" type="number"  variant="faded" />
                                    <Input label="Birth Day" color="primary" type="date" placeholder="mm/dd/yyyy"  variant="faded" />
                                </div>

                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <Select
                                        label="Status"
                                        className="max-w-xs"
                                        variant="underlined"
                                        color="primary"
                                    >
                                        {selectOptionStatusPatients.map((option) => (
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

                                    <Select
                                        label="Blood Type"
                                        className=""
                                        variant="underlined"
                                        color="primary"
                                        id="message"
                                        name="message"
                                    >
                                        {selectOptionsBloodType.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </Select>

                                </div>

                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <Select
                                        items={selectOptionsChronicDiseases}
                                        label="Chronic Diseases"
                                        color="primary"
                                        variant="bordered"
                                        isMultiline={true}
                                        selectionMode="multiple"
                                        labelPlacement="outside-left"
                                        classNames={{
                                            base: "max-w-xs",
                                            trigger: "min-h-unit-12 py-2",
                                        }}
                                        renderValue={(options) => {
                                            return (
                                                <div className="flex flex-wrap gap-2">
                                                    {options.map((option) => (
                                                        <ChipNextUi key={option.key}>{option.data?.value}</ChipNextUi>
                                                    ))}
                                                </div>
                                            );
                                        }}
                                    >
                                        {(option) => (
                                            <SelectItem key={option.id} textValue={option.value}>
                                                <div className="flex gap-2 items-center">
                                                    <div className="flex flex-col">
                                                        <span className="text-small">{option.value}</span>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        )}
                                    </Select>

                                    <Select
                                        items={selectOptionsAllergies}
                                        color="primary"
                                        label="Allergies"
                                        variant="bordered"
                                        isMultiline={true}
                                        selectionMode="multiple"
                                        labelPlacement="outside-left"
                                        classNames={{
                                            base: "max-w-xs",
                                            trigger: "min-h-unit-12 py-2",
                                        }}
                                        renderValue={(options) => {
                                            return (
                                                <div className="flex flex-wrap gap-2">
                                                    {options.map((option) => (
                                                        <ChipNextUi key={option.key}>{option.data?.value}</ChipNextUi>
                                                    ))}
                                                </div>
                                            );
                                        }}
                                    >
                                        {(option) => (
                                            <SelectItem key={option.id} textValue={option.value}>
                                                <div className="flex gap-2 items-center">
                                                    <div className="flex flex-col">
                                                        <span className="text-small">{option.value}</span>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        )}
                                    </Select>
                                </div>

                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <Select
                                        label="Select Doctor"
                                        selectionMode="single"
                                        selectedKeys={values}
                                        color="primary"
                                        variant="bordered"
                                        placeholder=""
                                        onChange={handleSelectionChange}
                                    >
                                        {doctorData.map((doctor: any) => (
                                            <SelectItem key={doctor.name} value={doctor.name}>
                                                {`${doctor.name} ${doctor.lastName}`}
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
        </ div>
    )
}