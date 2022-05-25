import { ChangeEvent, FC, useState } from 'react';
import styles from './TextFild.module.scss';

interface Props {
  type?: string;
  id?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const TextField: FC<Props> = (props) => {
  const { type, id, onChange, placeholder } = props;
  const [titleValue, setTitleValue] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
    onChange && onChange(e.target.value);
  };
  return (
    <div className={styles.textField}>
      <input
        placeholder={placeholder}
        type={type ? type : 'text'}
        id={id}
        value={titleValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextField;
