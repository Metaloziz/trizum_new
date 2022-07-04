import React, { FC, useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';
import moment from 'moment';
import { ToolbarProps } from 'react-big-calendar';

import appStore, { Roles } from 'app/stores/appStore';
import iconDelete from 'assets/svgs/delete.svg';
import iconSettings from 'assets/svgs/icon-settings.svg';
import Button from 'components/button/Button';
import Image from 'components/image/Image';
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

export const Toolbar: FC<ToolbarProps> = props => {
  const { onNavigate, date, children } = props;
  const { role } = appStore;
  return (
    <div className={styles.toolbarWrapper}>
      <div className={styles.toolbarFlexWrapper}>
        <div className={styles.childrenWrap}>{children}</div>
        <div className={styles.buttons}>
          {role === Roles.Teacher && (
            <>
              <Button type="none" size="small">
                Предыдущая
              </Button>
              <Button type="none" size="small">
                Текущая
              </Button>
              <Button type="none" size="small">
                Следующая
              </Button>
              <Button size="small">Найти</Button>
            </>
          )}
          {role === Roles.FranchiseeAdmin && (
            <>
              <Button type="none">Добавить группу</Button>
              <Button type="none">+ Добавить</Button>
              <Button type="none">Предыдущая</Button>
              <Button type="none">Текущая</Button>
              <Button type="none">Следующая</Button>
              <Button size="small">Найти</Button>
            </>
          )}
          {role === Roles.Franchisee && (
            <>
              <Button type="none" size="small">
                Предыдущая
              </Button>
              <Button type="none" size="small">
                Текущая
              </Button>
              <Button type="none" size="small">
                Следующая
              </Button>
              <Button size="small">Найти</Button>
            </>
          )}
          {role === Roles.Methodist && (
            <>
              <Button type="none">Предыдущая</Button>
              <Button type="none">Текущая</Button>
              <Button type="none">Следующая</Button>
              <Button size="small">Найти</Button>
            </>
          )}
          {role === Roles.Admin && (
            <>
              <Button type="none">Предыдущая</Button>
              <Button type="none">Текущая</Button>
              <Button type="none">Следующая</Button>
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
