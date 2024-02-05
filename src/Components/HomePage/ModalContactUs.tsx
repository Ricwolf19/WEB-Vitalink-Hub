import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useForm, ValidationError } from '@formspree/react';
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";

export default function ModalContactUs() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [backdrop] = React.useState<"blur" | "transparent" | "opaque" | undefined>('blur'); //Se elige blur entre todas las opciones de el estado de NEXTUI

    const handleOpen = () => {
        onOpen();
    }

    const [state, handleSubmit] = useForm("xleqjwoq");
    if (state.succeeded) {
        return <p>Thanks for joining!</p>;
    }

    return (
        <>
            <div className="flex flex-wrap gap-3">
                <Button
                    color="primary"
                    onPress={handleOpen}
                    className="capitalize"
                >
                    {'Contact Us'}
                </Button>
            </div>
            <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-blue-800 text-center">Send us a message</ModalHeader>
                            <ModalBody>
                                <form onSubmit={handleSubmit}>
                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <Input  label="Name" id="message" name="message"/>
                                        <Input  label="Last name" id="message" name="message" />
                                    </div>
                                    <br />
                                    <div className="flex w-full flex-wrap gap-4">
                                        <Input type="email" label="Email" id="email" name="email" />
                                        <ValidationError
                                            prefix="Email"
                                            field="email"
                                            errors={state.errors}
                                        />
                                    </div>
                                    <br />
                                    <div className="w-full grid">
                                        <Textarea
                                            variant='underlined'
                                            labelPlacement="outside"
                                            placeholder="Message"
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
                                            Close
                                        </Button>
                                        <Button color="primary" onPress={onClose} type="submit" disabled={state.submitting}>
                                            Submit
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

