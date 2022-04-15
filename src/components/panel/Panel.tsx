import classNames from 'classnames';
import { FC } from 'react';
import { PanelProps } from '@app/components/ComponentsProps';
import styles from './Panel.module.scss';

const Panel: FC<PanelProps> = ({ children, className }) => {
  return <div className={classNames(styles.panel, className)}>{children}</div>;
};

export default Panel;
