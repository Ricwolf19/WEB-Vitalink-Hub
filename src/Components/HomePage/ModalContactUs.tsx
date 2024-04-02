import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useForm, ValidationError } from '@formspree/react';
import { Input, Textarea } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

export default function ModalContactUs() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [backdrop] = React.useState<"blur" | "transparent" | "opaque" | undefined>('blur'); //Se elige blur entre todas las opciones de el estado de NEXTUI

    const handleOpen = () => {
        onOpen();
    }

    const [t] = useTranslation("global");

    const [state, handleSubmit] = useForm(import.meta.env.VITE_FORMSPREE_KEY as string);
    if (state.succeeded) {
        return <p className=" text-red-600 font-semibold">{t("s-hero.acknowledgments")}</p>;
    }

    return (
        <>
            <div className="flex flex-wrap gap-3">
                <Button
                    color="primary"
                    onPress={handleOpen}
                    className="capitalize"
                >
                    {t("s-hero.item5")}
                </Button>
            </div>
            <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose} placement="top-center">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-blue-800 text-center">{t("s-hero.itemMessage.title")}</ModalHeader>
                            <ModalBody>
                                <form onSubmit={handleSubmit}>
                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <Input label={t("s-hero.itemMessage.name")} id="message" name="message" color="primary" />
                                        <Input label={t("s-hero.itemMessage.lastName")} id="message" name="message" color="primary" />
                                    </div>
                                    <br />
                                    <div className="flex w-full flex-wrap gap-4">
                                        <Input type="email" label={t("s-hero.itemMessage.email")} id="email" name="email" color="primary" />
                                        <ValidationError
                                            prefix="Email"
                                            field="email"
                                            errors={state.errors}
                                        />
                                    </div>
                                    <br />
                                    <div className="w-full grid">
                                        <Textarea
                                            variant='flat'
                                            labelPlacement="outside"
                                            color="primary"
                                            placeholder={t("s-hero.itemMessage.message")}
                                            className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                                            id="message"
                                            name="message"
                                        />
                                        <ValidationError
                                            prefix="Message"
                                            field="message"
                                            errors={state.errors}
                                        />
                                    </div>
                                    <br />
                                    <div className=" text-right">
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            {t("s-hero.item3")}
                                        </Button>
                                        <Button color="primary" onPress={onClose} type="submit" disabled={state.submitting}>
                                            {t("s-hero.item4")}
                                        </Button>
                                    </div>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

