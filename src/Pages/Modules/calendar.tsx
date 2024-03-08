import { Calendar as BigCalendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import "react-big-calendar/lib/css/react-big-calendar.css"; // Keep the base styles
import { CalendarPlus2Icon } from 'lucide-react';

export function Calendar() {
    const localizer = dayjsLocalizer(dayjs);

    const EventComponent = (props: any) => (
        <div className="flex items-center">
          <CalendarPlus2Icon />
          <div className="bg-blue-500 text-white p-1 rounded text-xs">
            {props.title}
          </div>
        </div>
      );
    
      const components = {
        event: EventComponent
      };

    const events = [
        {
            start: dayjs('2024-03-07T12:00:00').toDate(),
            end: dayjs('2024-03-07T13:00:00').toDate(),
            title: "Consultation with Dr. Smith"
        },
        {
            start: dayjs('2024-03-08T10:30:00').toDate(),
            end: dayjs('2024-03-08T11:30:00').toDate(),
            title: "MRI Scan for Patient #12345"
        },
        {
            start: dayjs('2024-03-10T14:00:00').toDate(),
            end: dayjs('2024-03-10T15:00:00').toDate(),
            title: "Surgery for Patient #67890"
        },
        {
            start: dayjs('2024-03-12T08:00:00').toDate(),
            end: dayjs('2024-03-12T09:00:00').toDate(),
            title: "Physical Therapy Appointment"
        },
        {
            start: dayjs('2024-03-15T11:00:00').toDate(),
            end: dayjs('2024-03-15T12:00:00').toDate(),
            title: "Follow-up with Dr. Johnson"
        },
        {
            start: dayjs('2024-03-18T13:30:00').toDate(),
            end: dayjs('2024-03-18T14:30:00').toDate(),
            title: "Emergency Room Visit"
        },
        {
            start: dayjs('2024-03-20T16:00:00').toDate(),
            end: dayjs('2024-03-20T17:00:00').toDate(),
            title: "X-ray appointment for Patient #24680"
        },
        {
            start: dayjs('2024-03-23T09:30:00').toDate(),
            end: dayjs('2024-03-23T10:30:00').toDate(),
            title: "Cardiology Test for Patient #13579"
        },
        {
            start: dayjs('2024-03-25T14:00:00').toDate(),
            end: dayjs('2024-03-25T15:00:00').toDate(),
            title: "Oncology Consultation"
        },
        {
            start: dayjs('2024-03-28T10:00:00').toDate(),
            end: dayjs('2024-03-28T11:00:00').toDate(),
            title: "Psychiatry Session for Patient #11223"
        },
        {
            start: dayjs('2024-03-30T13:00:00').toDate(),
            end: dayjs('2024-03-30T14:00:00').toDate(),
            title: "Dermatology Check-up"
        },
        {
            start: dayjs('2024-04-02T09:00:00').toDate(),
            end: dayjs('2024-04-02T10:00:00').toDate(),
            title: "Pediatrics Consultation for Child #34678"
        },
        {
            start: dayjs('2024-04-05T15:00:00').toDate(),
            end: dayjs('2024-04-05T16:00:00').toDate(),
            title: "Appointment with Dr. Lee"
        },
        {
            start: dayjs('2024-04-08T11:30:00').toDate(),
            end: dayjs('2024-04-08T12:30:00').toDate(),
            title: "Gynecology Check-up"
        },
        {
            start: dayjs('2024-04-10T14:00:00').toDate(),
            end: dayjs('2024-04-10T15:00:00').toDate(),
            title: "Ear, Nose, and Throat (ENT) Specialist Appointment"
        }
    ];

    return (
        <>
         <br />
        <div style={{height: '80vh', maxWidth: '100%', overflow: 'hidden', backgroundColor: 'white'}}>
        <BigCalendar
          localizer={localizer}
          events={events}
          views={["month", "week", "day"]}
          components={components}
        />
      </div>
      </>
    );
}
