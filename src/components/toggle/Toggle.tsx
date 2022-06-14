import cn from 'classnames';
import { FC, useState } from 'react';
import styles from './Toggle.module.scss';

interface Toggle {
  defaultValue: boolean;
  onChange: (value: boolean) => void;
}

const Toggle: FC<Toggle> = ({ onChange, defaultValue }) => {
  const [switchActive, updateSwitchActive] = useState<boolean>(defaultValue);

  const onClickChangeToggle = () => {
    updateSwitchActive(!switchActive);
    onChange(!switchActive);
  };

  return (
    <div
      className={cn(styles.toggleSwitch, switchActive && styles.active)}
      onClick={onClickChangeToggle}
    >
      <div className={styles.circle} />
    </div>
  );
};
export default Toggle;
