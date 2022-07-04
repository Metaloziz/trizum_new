import { FC, useState } from 'react';

import cn from 'classnames';

import styles from './ButtonOpenClose.module.scss';

import iconClosed from 'assets/svgs/closed-lock.svg';
import iconOpen from 'assets/svgs/open-lock.svg';
import Image from 'components/image/Image';

interface Props {
  isOpen: boolean;
}

const ButtonOpenClose: FC<Props> = ({ isOpen }) => {
  const [open, setOpen] = useState<boolean>(isOpen);
  const iconButton = open ? (
    <Image src={iconOpen} alt="open" width={16} height={20} />
  ) : (
    <Image src={iconClosed} alt="lock" width={16} height={20} />
  );

  return (
    <button className={cn(styles.Button, !open && styles.closed)} onClick={() => setOpen(!open)}>
      <span className={styles.icon}>{iconButton}</span>
      {open ? 'Разблокировать' : 'Заблокировать'}
    </button>
  );
};

export default ButtonOpenClose;
