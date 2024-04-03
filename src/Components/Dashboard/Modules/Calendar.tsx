import { Calendar as BigCalendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import "react-big-calendar/lib/css/react-big-calendar.css"; // Keep the base styles
import { CalendarPlus2Icon } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent, Button, Input, Tooltip, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useState } from 'react';
import { useEventCalendar } from '../../../Context/authContext';
import { useTranslation } from 'react-i18next';


export function Calendars() {
    const { calendarEvents, handleCreateEvent, handleDeleteEvent, handleUpdateEvent } = useEventCalendar()
    const localizer = dayjsLocalizer(dayjs);

    const EventComponent = (props: any) => (
        <div className="flex items-center">
            <div className=" bg-red-900 text-white text-center text-xs">
                <Tooltip
                    content={props.title}
                    delay={0}
                    color='primary'
                    closeDelay={0}
                    motionProps={{
                        variants: {
                            exit: {
                                opacity: 0,
                                transition: {
                                    duration: 0.1,
                                    ease: "easeIn",
                                }
                            },
                            enter: {
                                opacity: 1,
                                transition: {
                                    duration: 0.15,
                                    ease: "easeOut",
                                }
                            },
                        },
                    }}
                >
                    <Button variant="shadow" color='danger'>
                        <CalendarPlus2Icon />{props.title}
                    </Button>
                </Tooltip>
            </div>
        </div>
    );

    // const SignsComponent = (props: any) => (
    //     <div className="flex items-center">
    //         <div className=" bg-red-900 text-white text-center text-xs">
    //             <Tooltip
    //                 content={props.title}
    //                 delay={0}
    //                 color='primary'
    //                 closeDelay={0}
    //                 motionProps={{
    //                     variants: {
    //                         exit: {
    //                             opacity: 0,
    //                             transition: {
    //                                 duration: 0.1,
    //                                 ease: "easeIn",
    //                             }
    //                         },
    //                         enter: {
    //                             opacity: 1,
    //                             transition: {
    //                                 duration: 0.15,
    //                                 ease: "easeOut",
    //                             }
    //                         },
    //                     },
    //                 }}
    //             >
    //                 <Button variant="shadow" color='danger'>
    //                     <IoMdQrScanner />{props.title}
    //                 </Button>
    //             </Tooltip>
    //         </div>
    //     </div>
    // );

    const EventsComponents = {
        event: EventComponent
    };

    // const VitaSignsComponents = {
    //     event: SignsComponent
    // };

    let oficialEvents: any = []

    for (let i = 0; i < calendarEvents.length; i++) {
        oficialEvents.push(
            {
                start: dayjs(calendarEvents[i].start).toDate(),
                end: dayjs(calendarEvents[i].end).toDate(),
                title: calendarEvents[i].title
            }
        )
    }

    // let oficialSignsEvents: any = []

    // let r = 0
    // while (r < signsEvents.length) {
    //     oficialSignsEvents.push(
    //         {
    //             start: dayjs(signsEvents[r].dateTime).toDate(),
    //             end: dayjs(signsEvents[r].dateTime).toDate(),
    //             title: signsEvents[r].dateTime,
    //         }
    //     )
    //     r++
    // }


    // for (let i = 0; i < patientData.length; i++) {
    //     // for(let r = 0; i < ; r++) {
    //       getVitalinkSignsEvents(patientData[i].id)
    //     // }
    // }

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [title, setTitle] = useState('')

    const [updateEvent, setUpdateEvent] = useState('');
    const [newStartDate, setNewStartDate] = useState('')
    const [newEndDate, setNewEndDate] = useState('')
    const [newTitle, setNewTitle] = useState('')

    const [deletedEvent, setDeletedEvents] = useState('');
    const [t] = useTranslation('global')

    return (
        <>
            <div className='flex space-x-5 mt-10'>
                <div className=''>
                    <Popover placement="bottom" showArrow offset={10}>
                        <PopoverTrigger>
                            <Button color="primary" variant='shadow'>{t("d-calendar.add.titleButton")}</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[240px]">
                            {(titleProps) => (
                                <div className="px-1 py-2 w-full">
                                    <p className="text-small font-bold text-foreground" {...titleProps}>
                                    {t("d-calendar.add.item1")}
                                    </p>
                                    <div className="mt-2 flex flex-col gap-2 w-full">
                                        <Input placeholder='mm/dd/yyyy' label={t("d-calendar.add.item2")} size="md" type='datetime-local' variant="underlined" onChange={(e) => setStartDate(e.target.value)} />
                                        <Input placeholder='mm/dd/yyyy' label={t("d-calendar.add.item3")}size="md" type='datetime-local' variant="underlined" onChange={(e) => setEndDate(e.target.value)} />
                                        {/* <Input placeholder='Event title' label="Title" size="md" type='text' variant="underlined" onChange={(e) => setTitle(e.target.value)} /> */}
                                        <Textarea                                            
                                            label={t("d-calendar.add.item4")}
                                            variant="bordered"
                                            labelPlacement="outside"
                                            placeholder={t("d-calendar.add.item5")}
                                            className="max-w-xs"
                                            onChange={(e: any) => setTitle(e.target.value)}
                                        />
                                        <Button color='danger' variant='shadow' onClick={() => handleCreateEvent(startDate, endDate, title)}>{t("d-calendar.add.action")}</Button>
                                    </div>
                                </div>
                            )}
                        </PopoverContent>
                    </Popover>
                </div>

                <div className=''>
                    <Popover placement="bottom" showArrow offset={10}>
                        <PopoverTrigger>
                            <Button color="warning" variant='shadow'>{t("d-calendar.update.titleButton")}</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[240px]">
                            {(titleProps) => (
                                <div className="px-1 py-2 w-full">
                                    <p className="text-small font-bold text-foreground pb-2" {...titleProps}>
                                    {t("d-calendar.titleEvents")}
                                    </p>

                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <Select
                                            label={t("d-calendar.update.item1")}
                                            selectionMode="single"
                                            color="danger"
                                            variant="faded"
                                            placeholder=""
                                            onChange={(e) => setUpdateEvent(e.target.value)}
                                        >
                                            {calendarEvents.map((event: any) => (
                                                <SelectItem key={event.id} value={event.id}>
                                                    {`${event.title}`}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className='mt-2 flex flex-col gap-2 w-full'>
                                        <Input placeholder='mm/dd/yyyy' label={t("d-calendar.update.item2")}size="md" type='datetime-local' variant="underlined" onChange={(e) => setNewStartDate(e.target.value)} />
                                        <Input placeholder='mm/dd/yyyy' label={t("d-calendar.update.item3")} size="md" type='datetime-local' variant="underlined" onChange={(e) => setNewEndDate(e.target.value)} />
                                        {/* <Input placeholder='New event title' label="New title" size="md" type='text' variant="underlined" onChange={(e) => setNewTitle(e.target.value)} /> */}
                                        <Textarea                                            
                                            label={t("d-calendar.update.item4")}
                                            variant="bordered"
                                            labelPlacement="outside"
                                            placeholder={t("d-calendar.update.item5")}
                                            className="max-w-xs"
                                            onChange={(e) => setNewTitle(e.target.value)}
                                        />
                                        <Button color='danger' variant='shadow' onClick={() => handleUpdateEvent(updateEvent, newStartDate, newEndDate, newTitle)}>{t("d-calendar.update.action")}</Button>
                                    </div>
                                </div>
                            )}
                        </PopoverContent>
                    </Popover>
                </div>

                <div className=''>
                    <Popover placement="bottom" showArrow offset={10}>
                        <PopoverTrigger>
                            <Button color="warning" variant='shadow'>{t("d-calendar.delete.titleButton")}</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[240px]">
                            {(titleProps) => (
                                <div className="px-1 py-2 w-full">
                                    <p className="text-small font-bold text-foreground pb-2" {...titleProps}>
                                    {t("d-calendar.titleEvents")}
                                    </p>

                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <Select
                                            label={t("d-calendar.delete.item1")}
                                            selectionMode="single"
                                            color="danger"
                                            variant="faded"
                                            placeholder=""
                                            onChange={(e) => setDeletedEvents(e.target.value)}
                                        >
                                            {calendarEvents.map((event: any) => (
                                                <SelectItem key={event.id} value={event.id}>
                                                    {`${event.title}`}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className='mt-2 flex flex-col gap-2 w-full'>
                                        <Button color="danger" variant='shadow' onClick={() => handleDeleteEvent(deletedEvent)}>{t("d-calendar.delete.action")}</Button>
                                    </div>
                                </div>
                            )}
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div style={{ height: '125vh', maxWidth: '100%', overflow: 'hidden', backgroundColor: 'white' }} className=' mt-6 rounded-lg'>

                <div className='text-center'>
                    <h2 className="text-3xl font-bold text-gradient md:text-4xl md:leading-[3rem] lg:text-3xl lg:leading-[4rem]">{t("d-calendar.title")}</h2>
                </div>

                <BigCalendar
                    localizer={localizer}
                    events={oficialEvents}
                    views={["month", "week", "day"]}
                    components={EventsComponents}
                />
            </div>

            {/* <div style={{ height: '100vh', maxWidth: '100%', overflow: 'hidden', backgroundColor: 'white' }} className='mt-10 rounded-lg'>

                <div className='text-center pt-0'>
                    <h2 className="text-3xl font-bold text-gradient md:text-4xl md:leading-[3rem] lg:text-3xl lg:leading-[4rem]">VitaLink Signs Calendar</h2>
                </div>
                <BigCalendar
                    localizer={localizer}
                    // events={[{start: dayjs('2024-03-26T22:37').toDate(), end: dayjs('2024-03-26T22:37').toDate(), title: 'Hola',}]}
                    events={oficialSignsEvents}
                    views={["month", "week", "day"]}
                    components={VitaSignsComponents}
                />
            </div> */}
        </>
    );
}
