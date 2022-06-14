import React, { FC, useState } from 'react';

import PaginationNextArrows from '@components/pagination-next-arrow/PaginationNextArrows';
import PaginationPrevArrows from '@components/pagination-prev-arrows/PaginationPrevArrows';
import className from 'classnames';

import styles from './Step.module.scss';

interface Props {
  countStep: number;
  onChange?: () => void;
  isRenderButtons?: boolean;
}

const Step: FC<Props> = ({ countStep, onChange, isRenderButtons }) => {
  const [activeStepCount, setActiveStepCount] = useState(1);
  const steps = Array.from({ length: countStep }, (_, index) => index + 1);
  const setStep = (step: number) => {
    setActiveStepCount(step);
    onChange && onChange();
  };
  return (
    <div className={styles.step}>
      {isRenderButtons && (
        <button
          disabled={activeStepCount === 1}
          className={styles.prevBtn}
          onClick={() => setActiveStepCount(activeStepCount - 1)}
        >
          <PaginationPrevArrows />
        </button>
      )}
      <ul className={styles.countList}>
        {steps.map(item => (
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
      {isRenderButtons && (
        <button
          disabled={steps.length === activeStepCount}
          className={styles.nextBtn}
          onClick={() => setActiveStepCount(activeStepCount + 1)}
        >
          <PaginationNextArrows />
        </button>
      )}
    </div>
  );
};

export default Step;
