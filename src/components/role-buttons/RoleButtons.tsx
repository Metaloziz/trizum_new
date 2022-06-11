import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import appStore, { Roles } from '@app/stores/appStore';
import styles from './RoleButtons.module.scss';

type Props = {
  name: string;
  onClick: () => void;
  active: string;
};

const buttons = Object.values(Roles);

const ButtonItem: FC<Props> = (props) => {
  const { name, active, onClick } = props;
  return (
    <button
      type="button"
      className={cn(styles.button, active === name && styles.button_active)}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

const RoleButtons = observer(() => {
  console.log(appStore.role);
  const onClick = (name: Roles) => {
    appStore.setRole(name);
  };
  return (
    <div className={styles.container}>
      {buttons.map((el) => (
        <ButtonItem
          key={el}
          name={el}
          onClick={() => onClick(el as Roles)}
          active={appStore.role}
        />
      ))}
    </div>
  );
});

export default RoleButtons;
