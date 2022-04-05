import React, { FC } from 'react';
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
  const finalStyle = `${className} ${typeImgStyle}`;
  return <div className={finalStyle}>{children}</div>;
};

export default CustomImageWrapper;
