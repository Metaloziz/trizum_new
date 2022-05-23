import moment from 'moment';
import React, { FC, SyntheticEvent, useState } from 'react';
import { Calendar, momentLocalizer, stringOrDate } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import BasicModal from '@components/basic-modal/BasicModal';
import {
  CustomEvent,
  CustomEventWrapper,
  CustomToolBar,
  ScheduleHeader,
} from '@components/schedule/ScheduleComponents';
import ScheduleModal from '@components/schedule/ScheduleModal';
import styles from './Schedule.module.scss';

require('moment/locale/ru');

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar as any);

export interface EventProps {
  event: any;
  title: string;
}

export type ScheduleEvent = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  lesson: string;
  class: string;
};

const eventsObj: object[] = [
  {
    id: 2,
    title: 'Event 1',
    allDay: false,
    start: new Date(2022, 4, 12, 8, 15), // 10.00 AM
    end: new Date(2022, 4, 12, 9, 0),
    lesson: 'lesson',
    class: '1A',
  },
  {
    id: 0,
    title: 'Event 2',
    allDay: false,
    start: new Date(2022, 4, 12, 9, 15), // 10.00 AM
    end: new Date(2022, 4, 12, 10, 0),
    lesson: 'lesson',
    class: '1A',
  },
];

const formats = {
  eventTimeRangeFormat: () => {
    return '';
  },
};

const ToolBar: FC<any> = (props) => {
  console.log(props);
  return <>fg</>;
};

const Schedule: FC = () => {
  const [events, setEvents] = useState<(ScheduleEvent | object)[]>(eventsObj);
  const [isVisible, setIsVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<
    ScheduleEvent | null | object
  >(null);
  const changeVisibility = () => {
    setIsVisible(!isVisible);
  };
  const moveEvent = ({
    event,
    start,
    end,
    isAllDay,
  }: {
    event: object;
    start: stringOrDate;
    end: stringOrDate;
    isAllDay: boolean;
  }) => {
    const idx = eventsObj.indexOf(event);
    const updatedEvent = { ...event, start, end };
    const nextEvents = [...eventsObj];
    nextEvents.splice(idx, 1, updatedEvent);
    setEvents(nextEvents);
  };
  const resizeEvent = ({
    event,
    start,
    end,
  }: {
    event: {
      id?: number;
    };
    start: stringOrDate;
    end: stringOrDate;
    isAllDay: boolean;
  }) => {
    const nextEvents = events.map((existingEvent: any) => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });
    setEvents(nextEvents);
  };
  const onSelectEvent = (
    event: object | ScheduleEvent,
    e: SyntheticEvent<HTMLElement, Event>,
  ) => {
    const target: any = e.target;

    if ('alt' in target && target.alt === 'Delete') {
      e.stopPropagation();
      const newEvents = events.filter((e) => {
        if ('id' in event && 'id' in e) {
          return e.id !== event.id;
        }
        return false;
      });
      //TODO: request for delete and request for new data
      setEvents(newEvents);
    } else {
      setCurrentEvent(event);
      changeVisibility();
    }
  };

  const onApplyEventChanges = (event: ScheduleEvent) => {
    const newEvents: (ScheduleEvent | object)[] = events.map((e) => {
      if ('id' in e) {
        return e.id === event.id ? event : e;
      }
      return e;
    });
    setEvents(newEvents);
  };

  return (
    <div className={styles.wrapper}>
      <DnDCalendar
        localizer={localizer}
        events={events}
        step={15}
        min={new Date(2022, 0, 1, 8, 0)}
        max={new Date(2022, 0, 5, 20, 30)}
        defaultView={'week'}
        views={['week']}
        messages={{ next: 'next', previous: 'last', today: 'Текущая' }}
        selectable
        tooltipAccessor={undefined}
        resizable
        formats={formats}
        onEventDrop={moveEvent}
        onEventResize={resizeEvent}
        onSelectEvent={onSelectEvent}
        components={{
          event: CustomEvent,
          eventWrapper: CustomEventWrapper,
          header: ScheduleHeader,
          // toolbar: CustomToolBar
        }}
      />
      <BasicModal visibility={isVisible} changeVisibility={changeVisibility}>
        <ScheduleModal
          event={currentEvent as ScheduleEvent}
          onApply={onApplyEventChanges}
        />
      </BasicModal>
    </div>
  );
};

export default Schedule;
//defaultMessages = {
//     date: 'Date',
//     time: 'Time',
//     event: 'Event',
//     allDay: 'All Day',
//     week: 'Week',
//     work_week: 'Work Week',
//     day: 'Day',
//     month: 'Month',
//     previous: 'Back',
//     next: 'Next',
//     yesterday: 'Yesterday',
//     tomorrow: 'Tomorrow',
//     today: 'Today',
//     agenda: 'Agenda',
//     noEventsInRange: 'There are no events in this range.',
//     showMore: function showMore(total) {
//       return "+" + total + " more";
//     }
//   };
