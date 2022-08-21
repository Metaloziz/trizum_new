import React, { FC, useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';
import moment from 'moment';
import { Navigate, ToolbarProps } from 'react-big-calendar';

import appStore, { Roles } from 'app/stores/appStore';
import groupStore from 'app/stores/groupStore';
import iconDelete from 'assets/svgs/delete.svg';
import iconSettings from 'assets/svgs/icon-settings.svg';
import Button from 'components/button/Button';
import Image from 'components/image/Image';
import styles from 'components/schedule/Schedule.module.scss';
import { EventProps } from 'components/schedule/ScheduleDnD';
import CustomDatePicker from 'components/tariff-page/customDatePicker';
import { checkRoleForClasses } from 'utils/checkRoleForClasses';
import AddEditGroup from 'components/classes-page/AddEditGroup';

export const Toolbar: FC<ToolbarProps> = props => {
  const { openModal, isModalOpen } = groupStore;
  const { onNavigate, date, children } = props;
  const [datePickerValue, setDatePickerValue] = useState<Date | null>(new Date());
  const { role } = appStore;

  const onNavigateDate = (newDate: Date | undefined) => {
    onNavigate(Navigate.DATE, newDate);
    // @ts-ignore
    setDatePickerValue(newDate);
  };

  return (
    <div className={styles.toolbarWrapper}>
      <div className={styles.toolbarFlexWrapper}>
        {children}
        <div className={styles.buttons}>
          {checkRoleForClasses(role) && (
            <Button variant="none" size="small" onClick={() => openModal()}>
              Добавить группу
            </Button>
          )}
          <div className={styles.dataContainer}>
            <CustomDatePicker value={datePickerValue} setValue={onNavigateDate} label="Дата" />
          </div>
          <Button variant="none" size="small" onClick={() => onNavigate('PREV', date)}>
            Предыдущая
          </Button>
          <Button variant="none" size="small" onClick={() => onNavigate('TODAY', date)}>
            Текущая
          </Button>
          <Button variant="none" size="small" onClick={() => onNavigate('NEXT', date)}>
            Следующая
          </Button>
          <Button size="small">Найти</Button>
        </div>
      </div>
      <AddEditGroup />
    </div>
  );
};

export const CustomEvent: FC<EventProps> = observer(({ event }) => {
  const [width, setWidth] = useState<number | undefined>(undefined);
  const { role } = appStore;
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  return (
    <div className={styles.eventFlexWrapper}>
      <div className={styles.eventText}>
        {width && width > 700 ? (
          <div>
            <span>Класс: </span>
            {event.groupName}
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
              {` ${moment(event.start).format('h:mm')} - ${moment(event.end).format('h:mm')}`}
            </span>
          </div>
        ) : null}
      </div>
      {role !== Roles.Teacher && (
        <div className={styles.eventIcons}>
          {/* <span>
            <Image src={iconDelete} width="18" height="18" alt="Delete" />
          </span> */}
          <span>
            <Image src={iconSettings} width="16" height="16" alt="Settings" />
          </span>
        </div>
      )}
    </div>
  );
});

export const ScheduleHeader: FC<any> = ({ date }: { date: Date }) => {
  const [width, setWidth] = useState<number | undefined>(undefined);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  const dateFormat = width && width > 700 ? 'DD.MM.YYYY' : 'DD.MM';
  return <>{moment(date).format(dateFormat)}</>;
};
