import React, { FC } from 'react';
import CustomCalendar from '@components/calendar/CustomCalendar';

interface Props {
  dataAuto: string;
}

const TextFieldCalendar: FC<Props> = ({ dataAuto }) => {
  return (
    <div style={{ display: 'flex' }}>
      <input type={'text'} />
      <div>
        <CustomCalendar
          dataAuto={dataAuto}
          setTitle={(t) => {
            t?.length;
          }}
        />
      </div>
    </div>
  );
};

export default TextFieldCalendar;
