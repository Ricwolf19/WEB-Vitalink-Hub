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
import { useTranslation } from "react-i18next";

export function EditPatient({ name, lastName, age, birthDate, area, status, doctorAssigned, bloodType, id, chronicDiseases, allergies }: any) {
  const { doctorData } = useDoctorData()
  const { handleUpdatePatient } = usePatientData()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [newPtName, setNewPtName] = useState(name);
  const [newPtlastName, setNewPtlastName] = useState(lastName);
  const [newPtStatus, setNewPtStatus] = useState(status);
  const [newPtArea, setNewPtArea] = useState(area);
  const [newPtChronicDiseases, setNewPtChronicDiseases] = useState(chronicDiseases);
  const [newPtAllergies, setNewPtAllergies] = useState(allergies);
  const [newPtBloodType, setNewPtBloodType] = useState(bloodType);
  const [newPtBirthDate, setNewPtBirthDate] = useState<any>(birthDate);
  const [newPtAge, setNewPtAge] = useState(age);
  const [newPtDoctorAssigned, setNewPtDoctorAssigned] = useState(doctorAssigned);

  const handleSelectionChronicDiseases = (e: any) => {
    setNewPtChronicDiseases(e.target.value.split(","));
  };

  const handleSelectionAllergies = (e: any) => {
    setNewPtAllergies(e.target.value.split(","));
  };

  const [t] = useTranslation("global")

  return (
    <div>
      <Button onPress={onOpen} color="primary" variant="shadow" startContent={<UserCog />} className="font-semibold">{t("d-personal.edit")}</Button>
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
              <ModalHeader className="flex flex-col gap-1 text-red-600 text-center"><div className="pb-2 text-center flex-col flex gap-1"><Logo /></div>{t("d-personal.patients.crudActions.title2")}</ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Input label={t("d-personal.patients.crudActions.item1")} color="primary" type="text" placeholder={name} onChange={(e) => setNewPtName(e.target.value)} variant="faded" />
                  <Input label={t("d-personal.patients.crudActions.item2")} color="primary" type="text" placeholder={lastName} onChange={(e) => setNewPtlastName(e.target.value)} variant="faded" />
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Input label={t("d-personal.patients.crudActions.item3")} color="primary" type="number" placeholder={age} onChange={(e) => setNewPtAge(e.target.valueAsNumber)} variant="faded" />
                  <Input label={t("d-personal.patients.crudActions.item4")} color="primary" type="date" placeholder={birthDate} onChange={(e) => setNewPtBirthDate(e.target.value)} variant="faded" />
                </div>

                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Select
                    label={t("d-personal.patients.crudActions.item5")}
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
                    label={t("d-personal.patients.crudActions.item6")}
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
                    label={t("d-personal.patients.crudActions.item7")}
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
                    aria-label={t("d-personal.patients.crudActions.item8")}
                    placeholder={t("d-personal.patients.crudActions.item8")}
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
                    aria-label={t("d-personal.patients.crudActions.item9")}
                    placeholder={t("d-personal.patients.crudActions.item9")}
                    variant="bordered"
                    isMultiline={true}
                    selectedKeys={newPtAllergies}
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
                    label={t("d-personal.patients.crudActions.item10")}
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
                  {t("d-personal.close")}
                  </Button>
                  <Button color="primary" onPress={onClose} onClick={() => handleUpdatePatient(id, newPtName, newPtlastName, newPtStatus, newPtArea, newPtChronicDiseases, newPtAllergies, newPtBloodType, newPtBirthDate, newPtAge, newPtDoctorAssigned)}>
                  {t("d-personal.edit")}
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