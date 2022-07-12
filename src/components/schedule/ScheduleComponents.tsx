import React, { FC, useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';
import moment from 'moment';
import { ToolbarProps } from 'react-big-calendar';

import appStore, { Roles } from 'app/stores/appStore';
import iconDelete from 'assets/svgs/delete.svg';
import iconSettings from 'assets/svgs/icon-settings.svg';
import BasicModal from 'components/basic-modal/BasicModal';
import Button from 'components/button/Button';
import Image from 'components/image/Image';
import InformationItem from 'components/information-item/InformationItem';
import styles from 'components/schedule/Schedule.module.scss';
import { EventProps } from 'components/schedule/ScheduleDnD';

// type ToolbarProps = {
//   date:Date
//   label:string
//   localizer:any
//   onNavigate:(navigate: NavigateAction, date?: Date | undefined)=>void
//   onView:(view:any)=>void
//   views:View[]
//   view:View
// }
// type qwe = FC<ToolbarProps<object, object>> | undefined

type Mock1 = {
  number: string;
  valueCalendar: JSX.Element;
  valueStart: JSX.Element;
  valueEnd: JSX.Element;
};

const moksDatas: Mock1[] = [
  {
    number: 'N1',
    valueCalendar: (
      <InformationItem className={styles.valueCalendar} title="Дата урока" variant="calendar" />
    ),
    valueStart: (
      <InformationItem className={styles.valueStart} title="Начало урока" variant="input" />
    ),
    valueEnd: <InformationItem className={styles.valueEnd} title="Конец урока" variant="input" />,
  },
  {
    number: 'N2',
    valueCalendar: (
      <InformationItem className={styles.valueCalendar} title="Дата урока" variant="calendar" />
    ),
    valueStart: (
      <InformationItem className={styles.valueStart} title="Начало урока" variant="input" />
    ),
    valueEnd: <InformationItem className={styles.valueEnd} title="Конец урока" variant="input" />,
  },
];

export const Toolbar: FC<ToolbarProps> = props => {
  const [isVisible, setIsVisible] = useState(false);
  const { onNavigate, date, children } = props;
  const { role } = appStore;
  const changeVisibility = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div className={styles.toolbarWrapper}>
      <div className={styles.toolbarFlexWrapper}>
        <div className={styles.childrenWrap}>{children}</div>
        <div className={styles.buttons}>
          {role === Roles.Teacher && (
            <>
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
            </>
          )}
          {role === Roles.FranchiseeAdmin && (
            <>
              <Button variant="none" size="small" onClick={() => setIsVisible(!isVisible)}>
                Добавить группу
              </Button>
              <Button variant="none" size="small" >+ Добавить</Button>
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
            </>
          )}
          {role === Roles.Franchisee && (
            <>
              <Button onClick={() => onNavigate('PREV', date)} variant="none" size="small">
                Предыдущая
              </Button>
              <Button onClick={() => onNavigate('TODAY', date)} variant="none" size="small">
                Текущая
              </Button>
              <Button onClick={() => onNavigate('NEXT', date)} variant="none" size="small">
                Следующая
              </Button>
              <Button size="small">Найти</Button>
            </>
          )}
          {role === Roles.Methodist && (
            <>
              <Button onClick={() => onNavigate('PREV', date)} size="small" variant="none">
                Предыдущая
              </Button>
              <Button onClick={() => onNavigate('TODAY', date)} size="small" variant="none">
                Текущая
              </Button>
              <Button onClick={() => onNavigate('NEXT', date)} size="small" variant="none">
                Следующая
              </Button>
              <Button size="small">Найти</Button>
            </>
          )}
          {role === Roles.Admin && (
            <>
              <Button onClick={() => onNavigate('PREV', date)} size="small" variant="none">
                Предыдущая
              </Button>
              <Button onClick={() => onNavigate('TODAY', date)} size="small" variant="none">
                Текущая
              </Button>
              <Button onClick={() => onNavigate('NEXT', date)} size="small" variant="none">
                Следующая
              </Button>
              <Button size="small">Найти</Button>
            </>
          )}
        </div>
        {/* <div className={styles.buttons}> */}
        {/* {role === Roles.FranchiseeAdmin && ( */}
        {/*   <div> */}
        {/*     <CustomButton type="none" size="small"> */}
        {/*       Добавить группу */}
        {/*     </CustomButton> */}
        {/*     <CustomButton type="none">+ Добавить</CustomButton> */}
        {/*   </div> */}
        {/* )} */}
        {/* { */}
        {/*   role === Roles.Franchisee && ( */}
        {/*     <> */}
        {/*       <CustomButton onClick={() => onNavigate('PREV', date)} type="none" size="small"> */}
        {/*         <span>Предыдущая</span> */}
        {/*         <span className={styles.arrow}> */}
        {/*     <Image src={buttonImage} alt="arrow" width={26} height={13} className={styles.prev} /> */}
        {/*   </span> */}
        {/*       </CustomButton> */}
        {/*       <CustomButton onClick={() => onNavigate('TODAY', date)} type="none" size="small"> */}
        {/*         Текущая */}
        {/*       </CustomButton> */}
        {/*       <CustomButton onClick={() => onNavigate('NEXT', date)} type="none" size="small"> */}
        {/*         <span>Следующая</span> */}
        {/*         <span className={styles.arrow}> */}
        {/*     <Image src={buttonImage} alt="arrow" width={26} height={13} /> */}
        {/*   </span> */}
        {/*       </CustomButton> */}
        {/*       <CustomButton size="small">Найти</CustomButton> */}
        {/*     </> */}
        {/*   ) */}
        {/* } */}
        {/* <CustomButton onClick={() => onNavigate('PREV', date)} type="none" size="small"> */}
        {/*   <span>Предыдущая</span> */}
        {/*   <span className={styles.arrow}> */}
        {/*     <Image src={buttonImage} alt="arrow" width={26} height={13} className={styles.prev} /> */}
        {/*   </span> */}
        {/* </CustomButton> */}
        {/* <CustomButton onClick={() => onNavigate('TODAY', date)} type="none" size="small"> */}
        {/*   Текущая */}
        {/* </CustomButton> */}
        {/* <CustomButton onClick={() => onNavigate('NEXT', date)} type="none" size="small"> */}
        {/*   <span>Следующая</span> */}
        {/*   <span className={styles.arrow}> */}
        {/*     <Image src={buttonImage} alt="arrow" width={26} height={13} /> */}
        {/*   </span> */}
        {/* </CustomButton> */}
        {/* <CustomButton size="small">Найти</CustomButton> */}
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
          {moksDatas.map(item => (
            <div key={item.number} className={styles.numberChoice}>
              <div>{item.number}</div>
              {item.valueCalendar}
              {item.valueStart}
              {item.valueEnd}
            </div>
          ))}
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
              {` ${moment(event.start).format('h:mm')} - ${moment(event.end).format('h:mm')}`}
            </span>
          </div>
        ) : null}
      </div>
      {role !== Roles.Teacher && (
        <div className={styles.eventIcons}>
          <span>
            <Image src={iconDelete} width="18" height="18" alt="Delete" />
          </span>
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
