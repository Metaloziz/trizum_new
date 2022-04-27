import { FC } from 'react';
import styles from './TextFild.module.scss';

interface Props {
  type?: string;
  id?: string;
}

const TextField: FC<Props> = ({ type, id }) => {
  return (
    <div className={styles.textField}>
      <input type={type} id={id} />
    </div>
  );
};

export default TextField;
