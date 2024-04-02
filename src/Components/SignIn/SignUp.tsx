import { ValidationError, useForm } from "@formspree/react";
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem, Textarea, useDisclosure } from "@nextui-org/react";
import { Logo } from "../HomePage/Icons";
import { useTranslation } from "react-i18next";


export function SignUp(){
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [t] = useTranslation("global");

    const selectOptions = [
      { label: "Personal Use", value: "personal", description: "Selected option for personal use.  " },
      { label: "Company", value: "company", description: "Selected for company-related accounts.  " },
      { label: "Hospital", value: "hospital", description: "Selected option for hospital-related accounts.  " },
    ]
  
    const [state, handleSubmit] = useForm(import.meta.env.VITE_FORMSPREE_KEY as string);
    
    return (
        <>
         <div className="flex flex-col gap-2">
              <Button onPress={onOpen} color="danger" variant="solid">{t("s-signUp.item1")}</Button>
              <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="center"
                scrollBehavior={'inside'}
                classNames={{
                  backdrop: "bg-gradient-to-t from-red-900 to-blue-900/10 backdrop-opacity-900",
                }}
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1 text-red-600">Create an Account</ModalHeader>
                      <ModalBody>
                        <Logo />
                        <p className="text-center">
                          If you want to create an account to access VitaLink's technology, please
                          contact us and provide the following information for better interaction
                          with the VitaLinkTeam. Thank you.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-4">
                          <div className="flex w-full h-full items-center justify-center">
                            <Select
                              label="Target audience"
                              className="max-w-xs"
                              variant="underlined"
                              color="danger"
                              id="message"
                              name="message"
                            >
                              {selectOptions.map((option) => (
                                <SelectItem key={option.description} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </Select>
                          </div>
                          <br />
                          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <Input label="Company, Hospital or Full Name" id="message" name="message" color="danger" variant="faded" />
                          </div>
                          <br />
                          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <Input type="email" label="Email" id="email" name="email" color="danger" variant="faded" />
                            <Input label="Contact Number" id="message" name="message" color="danger" variant="faded" />
                            <ValidationError prefix="Email" field="email" errors={state.errors} />
                          </div>
                          <br />
                          <Textarea
                            label="Reason for Account"
                            color="danger"
                            variant="faded"
                            placeholder="Tell us why you need the account..."
                            className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                            id="message"
                            name="message"
                          />
                          <ValidationError prefix="Message" field="message" errors={state.errors} />

                          <div className="mt-4 text-right">
                            <Button color="danger" variant="light" onPress={onClose}>
                              Close
                            </Button>
                            <Button color="primary" onPress={onClose} type="submit" disabled={state.submitting}>
                              Submit
                            </Button>
                          </div>
                        </form>
                      </ModalBody>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
        </>
    )
}