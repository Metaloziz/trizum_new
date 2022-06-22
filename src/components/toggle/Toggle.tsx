import { FC, useState } from 'react';

import cn from 'classnames';

import styles from './Toggle.module.scss';

type ToggleSize = 'small' | 'large';

interface Toggles {
  defaultValue: boolean;
  onChange: (value: boolean) => void;
  className?: string;
  size?: ToggleSize;
}

const Toggle: FC<Toggles> = ({ onChange, defaultValue, className, size }) => {
  const [switchActive, updateSwitchActive] = useState<boolean>(defaultValue);
  
  const onClickChangeToggle = () => {
    updateSwitchActive(!switchActive);
    onChange(!switchActive);
  };
  
  let sizeToggle = '';
  switch (size) {
    case 'small':
      sizeToggle = styles.small;
      break;
    case 'large':
      sizeToggle = styles.large;
      break;
    default:
      sizeToggle = '';
  }
  
  return (
    <div
      className={cn(className, sizeToggle, !switchActive && styles.active)}
      onClick={onClickChangeToggle}
    >
      <div className={styles.circle} />
    </div>
  );
};

Toggle.defaultProps = {
  className: '',
  size: undefined,
};
export default Toggle;
