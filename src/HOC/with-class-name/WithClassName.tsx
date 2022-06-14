import { FC } from 'react';

type Props = {
  Component: FC<{ className: string; [key: string]: any }>;
  className: string;
  [key: string]: any;
};

const WithClassName = ({ Component, className, ...props }: Props): JSX.Element => (
  <Component className={className} {...props} />
);

export default WithClassName;
