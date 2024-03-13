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
import { UserCog } from "lucide-react";
import { useDoctorData, usePatientData } from "../../../Context/authContext";
import { useState } from "react";

export function EditPatient({ name, lastName, age, birthDate, area, status, doctorAssigned, bloodType, id }: any) {
  const { doctorData } = useDoctorData()
  const { handleUpdatePatient } = usePatientData()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [newPtName, setNewPtName] = useState('');
  const [newPtlastName, setNewPtlastName] = useState('');
  const [newPtStatus, setNewPtStatus] = useState('');
  const [newPtArea, setNewPtArea] = useState('');
  const [newPtChronicDiseases, setNewPtChronicDiseases] = useState([]);
  const [newPtAllergies, setNewPtAllergies] = useState([]);
  const [newPtBloodType, setNewPtBloodType] = useState('');
  const [newPtBirthDate, setNewPtBirthDate] = useState<any>();
  const [newPtAge, setNewPtAge] = useState(0);
  const [newPtDoctorAssigned, setNewPtDoctorAssigned] = useState('');

  const handleSelectionChronicDiseases = (e: any) => {
    setNewPtChronicDiseases(e.target.value.split(","));
  };

  const handleSelectionAllergies = (e: any) => {
    setNewPtAllergies(e.target.value.split(","));
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
              <ModalHeader className="flex flex-col gap-1 text-red-600 text-center"><div className="pb-2 text-center flex-col flex gap-1"><Logo /></div>Edit Patient</ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Input label="Name" color="primary" type="text" placeholder={name} onChange={(e) => setNewPtName(e.target.value)} variant="faded" />
                  <Input label="Last Name" color="primary" type="text" placeholder={lastName} onChange={(e) => setNewPtlastName(e.target.value)} variant="faded" />
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Input label="Age" color="primary" type="number" placeholder={age} onChange={(e) => setNewPtAge(e.target.valueAsNumber)} variant="faded" />
                  <Input label="Birth Day" color="primary" type="date" placeholder={birthDate} onChange={(e) => setNewPtBirthDate(e.target.value)} variant="faded" />
                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Select
                    label="Status"
                    placeholder={status}
                    className="max-w-xs"
                    variant="underlined"
                    color="primary"
                    onChange={(e) => setNewPtStatus(e.target.value)}
                  >
                    {selectOptionStatusPatients.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.value}
                      </SelectItem>
                    ))}
                  </Select>

                  <Select
                    label="Area"
                    placeholder={area}
                    className="max-w-xs"
                    variant="underlined"
                    color="primary"
                    onChange={(e) => setNewPtArea(e.target.value)}
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
                    placeholder={bloodType}
                    variant="underlined"
                    color="primary"
                    id="message"
                    name="message"
                    onChange={(e) => setNewPtBloodType(e.target.value)}
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
                    aria-label="ChronicDiseases"
                    placeholder="ChronicDiseases"
                    color="primary"
                    variant="bordered"
                    isMultiline={true}
                    selectedKeys={newPtChronicDiseases}
                    onChange={handleSelectionChronicDiseases}
                    selectionMode="multiple"
                    labelPlacement="outside-left"
                    classNames={{
                      base: "",
                      trigger: "min-h-unit-12 py-2",
                    }}
                    renderValue={(options) => {
                      return (
                        <div className="flex flex-wrap gap-2">
                          {options.map((option) => (
                            <ChipNextUi key={option.textValue}>{option.data?.value}</ChipNextUi>
                          ))}
                        </div>
                      );
                    }}
                  >
                    {(option) => (
                      <SelectItem key={option.value} textValue={option.value}>
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
                    items={selectOptionsAllergies}
                    color="primary"
                    aria-label="Allergies"
                    placeholder="Allergies"
                    variant="bordered"
                    isMultiline={true}
                    onChange={handleSelectionAllergies}
                    selectionMode="multiple"
                    labelPlacement="outside-left"
                    classNames={{
                      base: "",
                      trigger: "min-h-unit-12 py-2",
                    }}
                    renderValue={(options) => {
                      return (
                        <div className="flex flex-wrap gap-2">
                          {options.map((option) => (
                            <ChipNextUi key={option.textValue}>{option.data?.value}</ChipNextUi>
                          ))}
                        </div>
                      );
                    }}
                  >
                    {(option) => (
                      <SelectItem key={option.value} textValue={option.value}>
                        <div className="flex gap-2 items-center">
                          <div className="flex flex-col">
                            <span className="text-small">{option.value}</span>
                          </div>
                        </div>
                      </SelectItem>
                    )}
                  </Select>
                  {/* <p className="text-small text-default-500">Selected: {Array.from(newPtAllergies).join(", ")}</p> */}
                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Select
                    label="Select Doctor"
                    placeholder={doctorAssigned}
                    selectionMode="single"
                    color="primary"
                    variant="bordered"
                    onChange={(e) => setNewPtDoctorAssigned(e.target.value)}
                  >
                    {doctorData.map((doctor: any) => (
                      <SelectItem key={doctor.name} value={doctor.name}>
                        {`${doctor.name} ${doctor.lastName}`}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                <div className="mt-4 text-right">
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose} onClick={() => handleUpdatePatient(id, newPtName, newPtlastName, newPtStatus, newPtArea, newPtChronicDiseases, newPtAllergies, newPtBloodType, newPtBirthDate, newPtAge, newPtDoctorAssigned)}>
                    Edit patient
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