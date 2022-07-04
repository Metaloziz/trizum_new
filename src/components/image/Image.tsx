import React, { FC } from 'react';

import cn from 'classnames';

import styles from './Image.module.scss';

type Props = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

const Image: FC<Props> = props => {
  const { alt, className } = props;
  return <img className={cn(styles.image, className)} alt={alt} {...props} />;
};

export default Image;
