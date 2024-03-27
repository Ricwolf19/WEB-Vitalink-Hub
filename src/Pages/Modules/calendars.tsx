import { Calendar as BigCalendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import "react-big-calendar/lib/css/react-big-calendar.css"; // Keep the base styles
import { CalendarPlus2Icon } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent, Button, Input, Tooltip, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useState } from 'react';
import { useEventCalendar } from '../../Context/authContext';


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
    // const [testing, setTesting] = useState<any>([])
    // setTesting(getVitalinkSignsEvents())

    return (
        <>
            <div className='flex space-x-5 mt-10'>
                <div className=''>
                    <Popover placement="bottom" showArrow offset={10}>
                        <PopoverTrigger>
                            <Button color="primary" variant='shadow'>Add Event</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[240px]">
                            {(titleProps) => (
                                <div className="px-1 py-2 w-full">
                                    <p className="text-small font-bold text-foreground" {...titleProps}>
                                        New Event
                                    </p>
                                    <div className="mt-2 flex flex-col gap-2 w-full">
                                        <Input placeholder='mm/dd/yyyy' label="Start date" size="md" type='datetime-local' variant="underlined" onChange={(e) => setStartDate(e.target.value)} />
                                        <Input placeholder='mm/dd/yyyy' label="End date" size="md" type='datetime-local' variant="underlined" onChange={(e) => setEndDate(e.target.value)} />
                                        {/* <Input placeholder='Event title' label="Title" size="md" type='text' variant="underlined" onChange={(e) => setTitle(e.target.value)} /> */}
                                        <Textarea                                            
                                            label="Title"
                                            variant="bordered"
                                            labelPlacement="outside"
                                            placeholder="Event title"
                                            className="max-w-xs"
                                            onChange={(e: any) => setTitle(e.target.value)}
                                        />
                                        <Button color='danger' variant='shadow' onClick={() => handleCreateEvent(startDate, endDate, title)}>Add New Event</Button>
                                    </div>
                                </div>
                            )}
                        </PopoverContent>
                    </Popover>
                </div>

                <div className=''>
                    <Popover placement="bottom" showArrow offset={10}>
                        <PopoverTrigger>
                            <Button color="warning" variant='shadow'>Update Event</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[240px]">
                            {(titleProps) => (
                                <div className="px-1 py-2 w-full">
                                    <p className="text-small font-bold text-foreground pb-2" {...titleProps}>
                                        Events
                                    </p>

                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <Select
                                            label="Select event to update"
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
                                        <Input placeholder='mm/dd/yyyy' label="New start date" size="md" type='datetime-local' variant="underlined" onChange={(e) => setNewStartDate(e.target.value)} />
                                        <Input placeholder='mm/dd/yyyy' label="New end date" size="md" type='datetime-local' variant="underlined" onChange={(e) => setNewEndDate(e.target.value)} />
                                        {/* <Input placeholder='New event title' label="New title" size="md" type='text' variant="underlined" onChange={(e) => setNewTitle(e.target.value)} /> */}
                                        <Textarea                                            
                                            label="Title"
                                            variant="bordered"
                                            labelPlacement="outside"
                                            placeholder="Event title"
                                            className="max-w-xs"
                                            onChange={(e) => setNewTitle(e.target.value)}
                                        />
                                        <Button color='danger' variant='shadow' onClick={() => handleUpdateEvent(updateEvent, newStartDate, newEndDate, newTitle)}>Update Event</Button>
                                    </div>
                                </div>
                            )}
                        </PopoverContent>
                    </Popover>
                </div>

                <div className=''>
                    <Popover placement="bottom" showArrow offset={10}>
                        <PopoverTrigger>
                            <Button color="warning" variant='shadow'>Delete Event</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[240px]">
                            {(titleProps) => (
                                <div className="px-1 py-2 w-full">
                                    <p className="text-small font-bold text-foreground pb-2" {...titleProps}>
                                        Events
                                    </p>

                                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <Select
                                            label="Select event to delete"
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
                                        <Button color="danger" variant='shadow' onClick={() => handleDeleteEvent(deletedEvent)}>Delete</Button>
                                    </div>
                                </div>
                            )}
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div style={{ height: '125vh', maxWidth: '100%', overflow: 'hidden', backgroundColor: 'white' }} className=' mt-6 rounded-lg'>

                <div className='text-center'>
                    <h2 className="text-3xl font-bold text-gradient md:text-4xl md:leading-[3rem] lg:text-3xl lg:leading-[4rem]">Events Calendar</h2>
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
