import { ValidationError, useForm } from "@formspree/react";
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem, Textarea, useDisclosure } from "@nextui-org/react";
import { Logo } from "../HomePage/Icons";
import { useTranslation } from "react-i18next";


export function SignUp(){
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [t] = useTranslation("global");

    const selectOptions = [
      { label: t("s-signUp.selectItems.item1"), value: t("s-signUp.selectItems.item1"), description: t("s-signUp.selectItems.item1Desc")},
      { label: t("s-signUp.selectItems.item2"), value: t("s-signUp.selectItems.item2"), description: t("s-signUp.selectItems.item2Desc") },
      { label: t("s-signUp.selectItems.item3"), value: t("s-signUp.selectItems.item3"), description: t("s-signUp.selectItems.item3Desc")},
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
                      <ModalHeader className="flex flex-col gap-1 text-red-600">{t("s-signUp.item2")}</ModalHeader>
                      <ModalBody>
                        <Logo />
                        <p className="text-center">
                        {t("s-signUp.item3")}
                        </p>

                        <form onSubmit={handleSubmit} className="mt-4">
                          <div className="flex w-full h-full items-center justify-center">
                            <Select
                              label={t("s-signUp.selectItems.title")}
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
                            <Input label={t("s-signUp.item4")} id="message" name="message" color="danger" variant="faded" />
                          </div>
                          <br />
                          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <Input type="email" label={t("s-signUp.item5")} id="email" name="email" color="danger" variant="faded" />
                            <Input label={t("s-signUp.item6")} id="message" name="message" color="danger" variant="faded" />
                            <ValidationError prefix="Email" field="email" errors={state.errors} />
                          </div>
                          <br />
                          <Textarea
                            label={t("s-signUp.item7")}
                            color="danger"
                            variant="faded"
                            placeholder={t("s-signUp.item8")}
                            className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                            id="message"
                            name="message"
                          />
                          <ValidationError prefix="Message" field="message" errors={state.errors} />

                          <div className="mt-4 text-right">
                            <Button color="danger" variant="light" onPress={onClose}>
                            {t("s-signUp.item11")}
                            </Button>
                            <Button color="primary" onPress={onClose} type="submit" disabled={state.submitting}>
                             {t("s-signUp.item10")}
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