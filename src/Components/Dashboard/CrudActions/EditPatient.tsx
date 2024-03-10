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
  import { selectOptionStatus, selectOptionsAllergies, selectOptionsArea, selectOptionsBloodType, selectOptionsChronicDiseases } from "../../../Data";
  import { Logo } from "../../HomePage/Icons";

export function EditPatient({ name, lastName, age, birthDate }: any) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div>
        <Button onPress={onOpen} color="primary" variant="solid" className="font-semibold">Edit test</Button>
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
                                      {/* <Select
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
                                      </Select> */}
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