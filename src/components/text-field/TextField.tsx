import { ChangeEvent, FC, useState } from 'react';

import styles from './TextField.module.scss';

interface Props {
  type?: string;
  id?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  value?: string;
  label?: string;
}

const TextField: FC<Props> = props => {
  const { type, id, onChange, placeholder, value, label } = props;
  const [titleValue, setTitleValue] = useState(value);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
    onChange && onChange(e.target.value);
  };
  return (
    <div className={styles.textField}>
      {label && <p>{label}</p>}
      <input
        placeholder={placeholder}
        type={type || 'text'}
        id={id}
        value={titleValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextField;
