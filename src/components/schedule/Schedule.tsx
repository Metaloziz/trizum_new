import React, { FC, SyntheticEvent, useState } from 'react';

import cn from 'classnames';
import { observer } from 'mobx-react';
import moment from 'moment';
import { Calendar, momentLocalizer, stringOrDate, ToolbarProps } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import styles from './Schedule.module.scss';

import appStore, { Roles } from 'app/stores/appStore';
import BasicModal from 'components/basic-modal/BasicModal';
import InformationItem from 'components/information-item/InformationItem';
import { CustomEvent, ScheduleHeader, Toolbar } from 'components/schedule/ScheduleComponents';
import ScheduleModal from 'components/schedule/ScheduleModal';
import CustomSelect from 'components/select/CustomSelect';
import { getOption } from 'utils/getOption';

require('moment/locale/ru');

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

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
// mock
const eventsObj: object[] = [
  {
    id: 'asd',
    title: 'Event 1',
    allDay: false,
    start: new Date(2022, 5, 2, 8, 15), // 10.00 AM
    end: new Date(2022, 5, 2, 9, 0),
    lesson: 'lesson',
    class: '1A',
  },
  {
    id: 'qwe',
    title: 'Event 2',
    allDay: false,
    start: new Date(2022, 4, 31, 9, 15), // 10.00 AM
    end: new Date(2022, 4, 31, 10, 0),
    lesson: 'lesson',
    class: '2A',
  },
];

const formats = {
  eventTimeRangeFormat: () => '',
};

const groups = ['group №1', 'group №2', 'group №3'];
const cityGroups = ['Аюта', 'Нежданная', 'Ростов на дону'];

const groupOptions = groups.map(el => getOption(el, el));
const groupsCities = cityGroups.map(el => getOption(el, el));

const ChildrenToolbar: FC = () => (
  <div className={cn(styles.toolbarFlex)}>
    <InformationItem
      title="Дата"
      variant="calendar"
      className={cn(styles.toolbarDateSelect, styles.choiceData)}
    />
    <div className={styles.group}>
      <p>Группа</p>
      <CustomSelect
        options={groupOptions}
        placeholder="Группа"
        className={styles.toolbarGroupSelect}
      />
    </div>
    <div className={styles.city}>
      <p>Город</p>
      <CustomSelect
        options={groupsCities}
        placeholder="Город"
        className={styles.toolbarGroupSelect}
      />
    </div>
  </div>
);

const Schedule: FC = () => {
  const [events, setEvents] = useState<(ScheduleEvent | object)[]>(eventsObj);
  const [isVisible, setIsVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<ScheduleEvent | null | object>(null);
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
    const idx = events.findIndex(e => (e as ScheduleEvent).id === (event as ScheduleEvent).id);
    const updatedEvent = { ...event, start, end };
    const nextEvents = [...events];
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
    const nextEvents = events.map(existingEvent => {
      if ('id' in existingEvent && existingEvent.id === event.id) {
        const startAsAr = moment(start).format('HH-mm').split('-');
        const startMinutes = Number(startAsAr[0]) * 60 + Number(startAsAr[1]);
        const endAsAr = moment(end).format('HH-mm').split('-');
        const endMinutes = Number(endAsAr[0]) * 60 + Number(endAsAr[1]);
        if (endMinutes - startMinutes < 45) {
          const hours = Math.trunc((startMinutes + 45) / 60);
          const minutes = (startMinutes + 45) % 60;
          const newEnd = new Date(
            (end as Date).getFullYear(),
            (end as Date).getMonth(),
            (end as Date).getDate(),
            hours,
            minutes,
          );
          return { ...existingEvent, start, end: newEnd };
        }
        return { ...existingEvent, start, end };
      }
      return existingEvent;
    });
    setEvents(nextEvents);
  };
  const onSelectEvent = (event: object | ScheduleEvent, e: SyntheticEvent<HTMLElement, Event>) => {
    const { target } = e;
    if ((target as HTMLImageElement).alt === 'Delete') {
      e.stopPropagation();
      const newEvents = events.filter(ev => {
        if ('id' in event && 'id' in ev) {
          return ev.id !== event.id;
        }
        return false;
      });
      // TODO: request for delete and request for new data
      setEvents(newEvents);
    } else {
      setCurrentEvent(event);
      changeVisibility();
    }
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const FullToolbar: FC<ToolbarProps<object | ScheduleEvent, object>> = observer(props => {
    const { role } = appStore;
    return <Toolbar {...props}>{role === Roles.Teacher && <ChildrenToolbar />}</Toolbar>;
  });

  const onApplyEventChanges = (event: ScheduleEvent) => {
    const newEvents: (ScheduleEvent | object)[] = events.map(e => {
      if ('id' in e) {
        return e.id === event.id ? event : e;
      }
      return e;
    });
    setEvents(newEvents);
  };
  const onAddLessonClick = () => {
    const newEvent = {
      id: 'qweasd',
      title: 'Event 3',
      allDay: false,
      start: new Date(2022, 5, 3, 9, 15), // 10.00 AM
      end: new Date(2022, 5, 3, 10, 0),
      lesson: 'lesson',
      class: '2A',
    };
    setEvents([...events, newEvent]);
  };

  return (
    <div className={styles.wrapper}>
      <Calendar
        localizer={localizer}
        events={events}
        step={15}
        min={new Date(2022, 0, 1, 8, 0)}
        max={new Date(2022, 0, 5, 20, 30)}
        defaultView="week"
        views={['week']}
        messages={{ next: 'next', previous: 'last', today: 'Текущая' }}
        // @ts-ignore
        tooltipAccessor={null}
        // resizable
        formats={formats}
        onSelectEvent={onSelectEvent}
        components={{
          event: CustomEvent,
          header: ScheduleHeader,
          toolbar: FullToolbar,
        }}
      />
      <BasicModal visibility={isVisible} changeVisibility={changeVisibility}>
        <ScheduleModal event={currentEvent as ScheduleEvent} onApply={onApplyEventChanges} />
      </BasicModal>
    </div>
  );
};

export default Schedule;
// defaultMessages = {
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
