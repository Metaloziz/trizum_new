import React, { FC } from 'react';

import styles from './BlueButton.module.scss';

type Props = {
  title: string;
  onClick: () => void;
  isActive?: boolean;
  type?: 'small';
};
const BlueButton: FC<Props> = props => {
  const { title, onClick, isActive, type } = props;
  const className = `${styles.item} ${isActive ? styles.item_active : ''} ${
    type === 'small' ? styles.item_small : ''
  }`;
  return (
    <div className={className} onClick={onClick}>
      {title}
    </div>
  );
};

BlueButton.defaultProps = {
  isActive: false,
  type: undefined,
};

export default BlueButton;
