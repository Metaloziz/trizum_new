import { FC } from 'react';

import classNames from 'classnames';

import styles from './Panel.module.scss';

import { PanelProps } from 'app/types/ComponentsProps';

const Panel: FC<PanelProps> = ({ children, className }) => (
  <div className={classNames(styles.panel, className)}>{children}</div>
);

export default Panel;
