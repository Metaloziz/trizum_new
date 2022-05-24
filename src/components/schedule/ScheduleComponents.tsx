import moment from 'moment';
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';
import { EventProps } from '@components/schedule/Schedule';
import styles from '@components/schedule/Schedule.module.scss';
import iconDelete from '@svgs/delete.svg';
import iconSettings from '@svgs/icon-settings.svg';

export const CustomEvent: FC<EventProps> = ({ event }) => {
  const [width, setWidth] = useState<number | undefined>(undefined);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  return (
    <div className={styles.eventFlexWrapper}>
      <div className={styles.eventText}>
        {width && width > 700 ? (
          <div>
            <span>Класс: </span>
            {event.class}
          </div>
        ) : null}
        <div>
          <span>Урок: </span>
          {event.lesson}
        </div>
        {width && width > 700 ? (
          <div className={styles.eventTime}>
            <span>Время:</span>
            <span>
              {` ${moment(event.start).format('h:mm')} - ${moment(
                event.end,
              ).format('h:mm')}`}
            </span>
          </div>
        ) : null}
      </div>
      <div className={styles.eventIcons}>
        <span>
          <Image
            src={iconDelete}
            width={'22'}
            height={'22'}
            alt={'Delete'}
            onClick={(e) => {
              // e.stopPropagation()
              console.log('hi');
            }}
          />
        </span>
        <span>
          <Image
            src={iconSettings}
            width={'18'}
            height={'18'}
            alt={'Settings'}
          />
        </span>
      </div>
    </div>
  );
};

export const CustomEventWrapper: FC<any> = (props) => {
  const { children } = props;
  return <>{children}</>;
};

export const ScheduleHeader: FC<any> = ({ date }: { date: Date }) => {
  const [width, setWidth] = useState<number | undefined>(undefined);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  const dateFormat = width && width > 700 ? 'DD.MM.YYYY' : 'DD.MM';
  return <>{moment(date).format(dateFormat)}</>;
};
const view = '';
export const CustomToolBar: FC<any> = (props) => {
  //TODO: props get navigate
  const handleDayChange = (event: any, mconte: any) => {
    console.log(event);
    console.log(mconte);
    mconte(event.target.value);
  };
  const handleNavigate = (detail: any, elem: any) => {
    console.log(detail);
    // detail.navigate(elem);
  };
  return (
    <div className="posr">
      <div className="rbc-btn-group">
        <button
          type="button"
          className="defaultbtn"
          onClick={(e) => handleNavigate(e, 'TODAY')}
        >
          Today
        </button>
        <button
          type="button"
          className="nextp-btn"
          onClick={(e) => handleNavigate(e, 'PREV')}
        >
          Prev
        </button>
        <button
          type="button"
          className="nextp-btn"
          onClick={(e) => handleNavigate(e, 'NEXT')}
        >
          Next
        </button>
      </div>
      <div className="rbc-toolbar-label">{props.label}</div>

      <div className="rbc-btn-group">
        <select
          className="form-control"
          onChange={(e) => handleDayChange(e, view)}
          defaultValue={'week'}
        >
          <option className="optionbar" value="day">
            Day
          </option>
          <option className="optionbar" value="week">
            Week
          </option>
          <option className="optionbar" value="month">
            Month
          </option>
          <option className="optionbar" value="agenda">
            Agenda
          </option>
        </select>
      </div>
    </div>
  );
};
