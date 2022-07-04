import React, { FC, ForwardedRef, forwardRef, Ref, useEffect, useState } from 'react';

import styles from './TimePicker.module.scss';

const ZERO = 0;
const ONE = 1;

type Props = {
  minutes: string[];
  hours: string[];
  defaultValue?: string;
  onSelect: (value: string) => void;
};

const TimePickerSelect = forwardRef((props: Props, ref: Ref<HTMLDivElement>) => {
  const { minutes, hours, onSelect, defaultValue } = props;

  const [min, setMin] = useState(
    defaultValue ? parseInt(defaultValue.split(':')[ONE], 10) : minutes[ZERO],
  );
  const [hour, setHour] = useState(
    defaultValue ? parseInt(defaultValue.split(':')[ZERO], 10) : hours[ZERO],
  );
  const onHourClick = (value: string): void => {
    setHour(value);
    onSelect(`${value}:${min}`);
  };
  const onMinClick = (value: string): void => {
    setMin(value);
    onSelect(`${hour}:${value}`);
  };

  return (
    <div ref={ref} className={styles.selectContainer}>
      <div className={styles.selectBlock}>
        {hours.map(h => (
          <span key={h} onClick={() => onHourClick(h)}>
            {h}
          </span>
        ))}
      </div>
      <div className={styles.selectBlock}>
        {minutes.map(m => (
          <span key={m} onClick={() => onMinClick(m)}>
            {m}
          </span>
        ))}
      </div>
    </div>
  );
});

TimePickerSelect.defaultProps = {
  defaultValue: undefined,
};

export default TimePickerSelect;
