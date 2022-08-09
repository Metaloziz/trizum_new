import { FC } from 'react';

import className from 'classnames';

import styles from '../Step.module.scss';

interface Props {
  countStep: number;
  activeStepCount: number;
}

const Stepper: FC<Props> = ({ countStep, activeStepCount }) => {
  const steps = Array.from({ length: countStep }, (_, index) => index + 1);

  return (
    <div className={styles.step}>
      <ul className={styles.countList}>
        {steps.map(item => (
          <li
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

export default Stepper;
