import React, { FC } from 'react';

import cn from 'classnames';

import styles from './CustomImageWrapper.module.scss';

type VariantType = 'circle' | 'square' | 'none';

interface Props {
  children?: React.ReactNode;
  className?: string;
  variant?: VariantType;
}

const CustomImageWrapper: FC<Props> = ({ children, className, variant }) => {
  let typeImgStyle = '';
  switch (variant) {
    case 'circle':
      typeImgStyle = styles.circle;
      break;
    case 'square':
      typeImgStyle = styles.square;
      break;
    default:
      typeImgStyle = styles.none;
  }
  return <div className={cn(className, typeImgStyle)}>{children}</div>;
};

export default CustomImageWrapper;
