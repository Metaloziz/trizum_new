import { FC, useId } from 'react';

import cn from 'classnames';
import Select, { ActionMeta, SingleValue } from 'react-select';

import styles from './CustomSelect.module.scss';

export type Option = { label: string; value: string };
interface Props {
  options: Option[];
  placeholder?: string;
  onChange?: (option: Option) => void;
  className?: string;
  title?: string;
  error?: string;
  value?: Option;
}

const CustomSelect: FC<Props> = props => {
  const { options, placeholder, className, onChange, title, value, error } = props;
  const id = useId();
  const instanceId = useId();
  const handleChange = (v: SingleValue<Option> | null, actionMeta: ActionMeta<Option>) => {
    v && onChange && onChange(v);
  };
  return (
    <div className={cn(styles.selectWrap, className)}>
      {title && <p className={styles.label}>{title}</p>}
      <Select
        id={id}
        instanceId={instanceId}
        placeholder={placeholder}
        options={options}
        onChange={handleChange}
        value={value}
        components={{ IndicatorSeparator: () => null }}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default CustomSelect;
