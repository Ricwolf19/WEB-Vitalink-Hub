import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
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
  Chip as ChipNextUi
} from "@nextui-org/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { projectsTableData, selectOptionStatus, selectOptionsAllergies, selectOptionsArea, selectOptionsBloodType, selectOptionsChronicDiseases } from "../../Data";
import { usePatientData } from "../../Context/authContext";
import { Logo } from "../../Components/HomePage/Icons";



export function Patients() {
  const { patientData } = usePatientData();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card placeholder="">
        <CardHeader placeholder="" variant="gradient" color="red" className="mb-8 p-6">
          <Typography placeholder="" variant="h6" color="white">
            Patients Table
          </Typography>
        </CardHeader>
        <CardBody placeholder="" className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Name", "Status", "Area", "Chronic Diseases", "Allergies", "Blood Type", "Birth Date", "Age", "Doctor Assigned"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-center"
                  >
                    <Typography
                      placeholder=""
                      variant="small"
                      className="text-[14px] font-bold uppercase text-blue-900"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {patientData.map(
                ({ age, allergies, area, birthDate, bloodType, chronicDiseases, lastName, name, status, doctorAssigned }: any, key: any) => {
                  const className = `py-3 px-5 text-center ${key === patientData.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                    }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4 text-center">
                          <Avatar placeholder="" src={'/img/pacient-icon.jpeg'} alt={name} variant="rounded" />
                          <div>
                            <Typography
                              placeholder=""
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {name}
                            </Typography>
                            <Typography placeholder="" className="text-sm font-normal text-black">
                              {lastName}
                            </Typography>
                          </div>
                        </div>
                      </td>

                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={status ? "blue" : "red"}
                          value={status ? "Stable" : "Unstable"}
                          className="py-0.5 px-2 text-[14px] font-semibold"
                        />
                      </td>
                      <td className={className}>
                        <Typography placeholder="" className="font-semibold text-black">
                          {area}
                        </Typography>
                        {/* <Typography placeholder="" className="text-xs font-normal text-blue-gray-500">
                          {job[1]}
                        </Typography> */}
                      </td>
                      <td className={className}>
                        <Typography placeholder="" className="font-semibold text-black text-center">
                          {chronicDiseases}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography placeholder="" className="font-semibold text-black">
                          {allergies}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography placeholder="" className="font-semibold text-black">
                          {bloodType}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography placeholder="" className="font-semibold text-black">
                          {birthDate}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography placeholder="" className="font-semibold text-black">
                          {age}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="flex items-center gap-4 text-center">
                          <Avatar placeholder="" src={'/img/doctor-icon.png'} alt={name} size="sm" variant="rounded" />
                          <div>
                            <Typography
                              placeholder=""
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {doctorAssigned ? "Doctor: " + doctorAssigned : "Doctor not assigned yet"}
                            </Typography>
                          </div>
                        </div>
                      </td>

                      <td className={className}>
                        <div className="flex flex-col gap-2 ">
                          <Button onPress={onOpen} color="primary" variant="solid" className="font-semibold">Edit</Button>
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
                                      <Input label="Name" color="primary" placeholder={name} variant="faded" />
                                      <Input label="Last Name" color="primary" placeholder={lastName} variant="faded" />
                                    </div>
                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                      <Input label="Age" color="primary" placeholder={age} variant="faded" />
                                      <Input label="Birth Day" color="primary" placeholder={birthDate} variant="faded" />
                                    </div>

                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                      <Select
                                        label="Status"
                                        className="max-w-xs"
                                        variant="underlined"
                                        color="primary"
                                      >
                                        {selectOptionStatus.map((option) => (
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
                                        color="primary"
                                        variant="bordered"
                                        isMultiline={true}
                                        selectionMode="multiple"
                                        placeholder="Chronic Diseases"
                                        labelPlacement="outside"
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
                                        variant="bordered"
                                        isMultiline={true}
                                        selectionMode="multiple"
                                        placeholder="Allergies"
                                        labelPlacement="outside"
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
                                        items={users}
                                        label="Assigned to"
                                        className="max-w-xs"
                                        variant="bordered"
                                        classNames={{
                                          label: "group-data-[filled=true]:-translate-y-5",
                                          trigger: "min-h-unit-16",
                                          listboxWrapper: "max-h-[400px]",
                                        }}
                                        listboxProps={{
                                          itemClasses: {
                                            base: [
                                              "rounded-md",
                                              "text-default-500",
                                              "transition-opacity",
                                              "data-[hover=true]:text-foreground",
                                              "data-[hover=true]:bg-default-100",
                                              "dark:data-[hover=true]:bg-default-50",
                                              "data-[selectable=true]:focus:bg-default-50",
                                              "data-[pressed=true]:opacity-70",
                                              "data-[focus-visible=true]:ring-default-500",
                                            ],
                                          },
                                        }}
                                        popoverProps={{
                                          classNames: {
                                            base: "before:bg-default-200",
                                            content: "p-0 border-small border-divider bg-background",
                                          },
                                        }}
                                        renderValue={(items) => {
                                          return items.map((item) => (
                                            <div key={item.key} className="flex items-center gap-2">
                                              <Avatar
                                                alt={item.data.name}
                                                className="flex-shrink-0"
                                                size="sm"
                                                src={item.data.avatar}
                                              />
                                              <div className="flex flex-col">
                                                <span>{item.data.name}</span>
                                                <span className="text-default-500 text-tiny">({item.data.email})</span>
                                              </div>
                                            </div>
                                          ));
                                        }}
                                      >
                                        {(user) => (
                                          <SelectItem key={user.id} textValue={user.name}>
                                            <div className="flex gap-2 items-center">
                                              <Avatar alt={user.name} className="flex-shrink-0" size="sm" src={user.avatar} />
                                              <div className="flex flex-col">
                                                <span className="text-small">{user.name}</span>
                                                <span className="text-tiny text-default-400">{user.email}</span>
                                              </div>
                                            </div>
                                          </SelectItem>
                                        )}
                                      </Select>
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
                      </td>

                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <Card placeholder="">
        <CardHeader placeholder="" variant="gradient" color="red" className="mb-8 p-6">
          <Typography placeholder="" variant="h6" color="white">
            Doctors Table
          </Typography>
        </CardHeader>
        <CardBody placeholder="" className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["companies", "members", "budget", "completion", ""].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        placeholder=""
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {projectsTableData.map(
                ({ img, name, members, budget, completion }, key) => {
                  const className = `py-3 px-5 ${key === projectsTableData.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                    }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar placeholder="" src={img} alt={name} size="sm" />
                          <Typography
                            placeholder=""
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {name}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        {members.map(({ img, name }, key) => (
                          <Tooltip key={name} content={name}>
                            <Avatar
                              placeholder=""
                              src={img}
                              alt={name}
                              size="xs"
                              variant="circular"
                              className={`cursor-pointer border-2 border-white ${key === 0 ? "" : "-ml-2.5"
                                }`}
                            />
                          </Tooltip>
                        ))}
                      </td>
                      <td className={className}>
                        <Typography
                          placeholder=""
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {budget}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="w-10/12">
                          <Typography
                            placeholder=""
                            variant="small"
                            className="mb-1 block text-xs font-medium text-blue-gray-600"
                          >
                            {completion}%
                          </Typography>
                          <Progress
                            placeholder=""
                            value={completion}
                            variant="gradient"
                            color={completion === 100 ? "green" : "gray"}
                            className="h-1"
                          />
                        </div>
                      </td>
                      <td className={className}>
                        <Typography
                          placeholder=""
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          <EllipsisVerticalIcon
                            strokeWidth={2}
                            className="h-5 w-5 text-inherit"
                          />
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

