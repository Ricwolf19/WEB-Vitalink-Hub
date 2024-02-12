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

    const [state, handleSubmit] = useForm(import.meta.env.VITE_FORMSPREE_KEY as string);
    if (state.succeeded) {
        return <p className=" text-red-600 font-semibold">Thank you for your message, from the vitalinkhub team.</p>;
    }

    return (
        <>
            <div className="flex flex-wrap gap-3">
                <Button
                    color="primary"
                    onPress={handleOpen}
                    className="capitalize"
                >
                    {'Send Message'}
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
                                        <Input  label="Name" id="message" name="message" color="primary"/>
                                        <Input  label="Last name" id="message" name="message" color="primary"/>
                                    </div>
                                    <br />
                                    <div className="flex w-full flex-wrap gap-4">
                                        <Input type="email" label="Email" id="email" name="email" color="primary"/>
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

