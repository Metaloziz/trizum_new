import React, { FC } from 'react';
import CustomCalendar from '@components/calendar/CustomCalendar';

type Props = {
  onSelectDate: (str: string) => void;
  value?: string;
  type?: 'standard' | 'blue';
  iconParams?: { width: number; height: number };
  icon?: string;
  dataAuto: string;
};

const TextFieldCalendar: FC<Props> = (props) => {
  const { onSelectDate, type, value, icon, iconParams, dataAuto } = props;
  if(type){

  }
  return (
    <div style={{ display: 'flex' }}>
      <input type="text" value={value} />
      <div>
        <CustomCalendar
          setTitle={onSelectDate}
          iconParams={iconParams}
          icon={icon}
          dataAuto={dataAuto}
        />
      </div>
    </div>
  );
};

export default TextFieldCalendar;
