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
import BasicModal from 'components/basic-modal/BasicModal';
import InformationItem from 'components/information-item/InformationItem';

export const Toolbar: FC<ToolbarProps> = props => {
  const { openModal } = groupStore;
  const [isVisible, setIsVisible] = useState(false);
  const { onNavigate, date, children } = props;
  const [datePickerValue, setDatePickerValue] = useState<Date | null>(new Date());
  const { role } = appStore;
  const changeVisibility = () => {
    setIsVisible(!isVisible);
  };
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
      {/* <BasicModal visibility={isVisible} changeVisibility={changeVisibility}> */}
      {/*  <div className={styles.modalWrap}> */}
      {/*    <h2>Добавить группу</h2> */}
      {/*    <div className={styles.modalInfo}> */}
      {/*      <div className={styles.nameTeacher}> */}
      {/*        <p>ФИО Учителя</p> */}
      {/*        <InformationItem variant='input' /> */}
      {/*      </div> */}
      {/*      <div className={styles.nameGroup}> */}
      {/*        <p>Название группы</p> */}
      {/*        <InformationItem variant='input' /> */}
      {/*      </div> */}
      {/*      <div className={styles.levelGroup}> */}
      {/*        <p>Уровень группы</p> */}
      {/*        <InformationItem variant='select' /> */}
      {/*      </div> */}
      {/*    </div> */}
      {/*    <div className={styles.modalBtn}> */}
      {/*      <Button>Сохранить</Button> */}
      {/*    </div> */}
      {/*  </div> */}
      {/* </BasicModal> */}
      {/* <BasicModal visibility={isVisible} changeVisibility={changeVisibility}> */}
      {/*  <div className={styles.modalWrapLessons}> */}
      {/*    <h2>Редактирование урока</h2> */}
      {/*    <div className={styles.blockDate}> */}
      {/*      <div> */}
      {/*        <p>Дата урока</p> */}
      {/*        <InformationItem className={styles.calendarInfo} variant="calendar" /> */}
      {/*      </div> */}
      {/*      <div> */}
      {/*        <p>Начало урока</p> */}
      {/*        <InformationItem className={styles.infoInput} variant="input" /> */}
      {/*      </div> */}
      {/*      <div> */}
      {/*        <p>Конец урока</p> */}
      {/*        <InformationItem className={styles.infoInput} variant="input" /> */}
      {/*      </div> */}
      {/*    </div> */}
      {/*    <div className={styles.statusInfo}> */}
      {/*      <div> */}
      {/*        <p>Статус</p> */}
      {/*        <InformationItem className={styles.selectInfo} variant="select" /> */}
      {/*      </div> */}
      {/*      <div> */}
      {/*        <p>ФИО Учителя</p> */}
      {/*        <InformationItem className={styles.inputInfo} variant="input" /> */}
      {/*      </div> */}
      {/*    </div> */}
      {/*    <div className={styles.levelInfo}> */}
      {/*      <div> */}
      {/*        <p>Название группы</p> */}
      {/*        <InformationItem className={styles.nameInfo} variant="input" /> */}
      {/*      </div> */}
      {/*      <div> */}
      {/*        <p>Уровень группы</p> */}
      {/*        <InformationItem className={styles.levelSelect} variant="select" /> */}
      {/*      </div> */}
      {/*      <div className={styles.btnAddInfo}> */}
      {/*        <Button>Сохранить</Button> */}
      {/*      </div> */}
      {/*    </div> */}
      {/*  </div> */}
      {/* </BasicModal> */}
      <BasicModal visibility={isVisible} changeVisibility={changeVisibility}>
        <div className={styles.modalAddLessons}>
          <h2>Добавление уроков</h2>
          <div className={styles.levelBlock}>
            <div>
              <p>Уровень</p>
              <InformationItem className={styles.levelSelectBlock} variant="select" />
            </div>
            <div>
              <p>Группа</p>
              <InformationItem className={styles.levelSelectBlock} variant="select" />
            </div>
          </div>
          {/* {moksDatas.map(item => ( */}
          {/*  <div key={item.number} className={styles.numberChoice}> */}
          {/*    <div>{item.number}</div> */}
          {/*    {item.valueCalendar} */}
          {/*    {item.valueStart} */}
          {/*    {item.valueEnd} */}
          {/*  </div> */}
          {/* ))} */}
          <div className={styles.addLevelBtn}>
            <Button>Сохранить</Button>
          </div>
        </div>
      </BasicModal>
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
            {event.grouopName}
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

export const CustomEventWrapper: FC<any> = props => {
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
export const CustomToolBar: FC<any> = props => {
  // TODO: props get navigate
  const handleDayChange = (event: any, mconte: any) => {
    mconte(event.target.value);
  };
  const handleNavigate = (detail: any, elem: any) => {
    // detail.navigate(elem);
  };
  return (
    <div className="posr">
      <div className="rbc-btn-group">
        <button type="button" className="defaultbtn" onClick={e => handleNavigate(e, 'TODAY')}>
          Today
        </button>
        <button type="button" className="nextp-btn" onClick={e => handleNavigate(e, 'PREV')}>
          Prev
        </button>
        <button type="button" className="nextp-btn" onClick={e => handleNavigate(e, 'NEXT')}>
          Next
        </button>
      </div>
      <div className="rbc-toolbar-label">{props.label}</div>

      <div className="rbc-btn-group">
        <select
          className="form-control"
          onChange={e => handleDayChange(e, view)}
          defaultValue="week"
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
