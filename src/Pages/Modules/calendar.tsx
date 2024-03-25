import { Calendar as BigCalendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import "react-big-calendar/lib/css/react-big-calendar.css"; // Keep the base styles
import { CalendarPlus2Icon } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent, Button, Input, Tooltip } from "@nextui-org/react";
import { useState } from 'react';
import { useEventCalendar } from '../../Context/authContext';



export function Calendar() {
    const { calendarEvents, handleCreateEvent } = useEventCalendar()
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
                        <CalendarPlus2Icon />{props.title}</Button>
                </Tooltip>
            </div>
        </div>
    );

    const components = {
        event: EventComponent
    };

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

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [newTitle, setNewTitle] = useState('')

    return (
        <>
            <div className=' pb-2.5 pt-2.5'>
                <Popover placement="right" showArrow offset={10}>
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
                                    <Input placeholder='mm/dd/yyyy' label="Start" size="md" type='datetime-local' variant="underlined" onChange={(e) => setStartDate(e.target.value)} />
                                    <Input placeholder='mm/dd/yyyy' size="md" type='datetime-local' variant="underlined" onChange={(e) => setEndDate(e.target.value)} />
                                    <Input placeholder='New event title' label="Title" size="md" type='text' variant="underlined" onChange={(e) => setNewTitle(e.target.value)} />
                                    <Button color='danger' variant='shadow' onClick={() => handleCreateEvent(startDate, endDate, newTitle)}>Add New Event</Button>
                                </div>
                            </div>
                        )}
                    </PopoverContent>
                </Popover>
            </div>


            <div style={{ height: '80vh', maxWidth: '100%', overflow: 'hidden', backgroundColor: 'white' }}>
                <BigCalendar
                    localizer={localizer}
                    events={oficialEvents}
                    views={["month", "week", "day"]}
                    components={components}
                />
            </div>
        </>
    );
}
