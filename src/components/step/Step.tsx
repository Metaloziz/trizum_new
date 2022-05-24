import className from 'classnames';
import React, { FC, useState } from 'react';
import styles from './Step.module.scss';

interface Props {
  count: number;
  onChange?: () => void;
}

const Step: FC<Props> = ({ count, onChange }) => {
  const [activeStepCount, setActiveStepCount] = useState(1);
  const steps = Array.from({ length: count }, (_, index) => index + 1);
  const setStep = (step: number) => {
    setActiveStepCount(step);
    onChange && onChange();
  };
  return (
    <div className={styles.step}>
      <ul className={styles.countList}>
        {steps.map((item) => (
          <li
            onClick={() => setStep(item)}
            key={item}
            className={className(styles.countItem, {
              [styles.activeItem]: item === activeStepCount,
            })}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Step;
