import React, { useState } from 'react';
import CustomCalendar from '@components/calendar/CustomCalendar';

const TextFieldCalendar = () => {
  const [title, setTitle] = useState('');
  return (
    <div style={{ display: 'flex' }}>
      <input type="text" />
      <div>
        <CustomCalendar setTitle={() => setTitle(title)} />
      </div>
    </div>
  );
};

export default TextFieldCalendar;
