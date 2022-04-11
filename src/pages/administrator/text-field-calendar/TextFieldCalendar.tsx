import React from 'react';
import CustomCalendar from '@components/calendar/CustomCalendar';

const TextFieldCalendar = () => {
  return (
    <div style={{ display: 'flex' }}>
      <input type="text" />
      <div>
        <CustomCalendar />
      </div>
    </div>
  );
};

export default TextFieldCalendar;
