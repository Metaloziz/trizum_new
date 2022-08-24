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
import { ButtonGroup, FormControl, Grid } from '@mui/material';

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
        {/* <div className={styles.buttons}> */}

        <Grid
          container
          columnSpacing={{ xs: 1, sm: 3, md: 1, lg: 1 }}
          spacing={{ xs: 2 }}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={12} md>
            <FormControl fullWidth>
              <CustomDatePicker value={datePickerValue} setValue={onNavigateDate} label="Дата" />
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={4} md>
            <FormControl fullWidth>
              <Button variant="none" size="middleLight" onClick={() => onNavigate('PREV', date)}>
                Предыдущая
                <br />
                неделя
              </Button>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={4} md>
            <FormControl fullWidth>
              <Button variant="none" size="middleLight" onClick={() => onNavigate('TODAY', date)}>
                Текущая
                <br />
                неделя
              </Button>
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={4} md>
            <FormControl fullWidth>
              <Button variant="none" size="middleLight" onClick={() => onNavigate('NEXT', date)}>
                Следующая
                <br />
                неделя
              </Button>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md>
            <FormControl fullWidth>
              <Button size="middle">Найти</Button>
            </FormControl>
          </Grid>
        </Grid>
        {/* </div> */}
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
