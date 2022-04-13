import { FC } from 'react';
import { PanelProps } from '@app/components/ComponentsProps';
import styles from './Panel.module.scss';
import classNames from 'classnames';

const Panel: FC<PanelProps> = ({ children, className }) => {
  return <div className={classNames(styles.panel, className)}>{children}</div>;
};

export default Panel;
