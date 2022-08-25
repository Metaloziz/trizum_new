import { FC, useId } from 'react';

import cn from 'classnames';
import Select, { ActionMeta, SingleValue } from 'react-select';

import styles from './CustomSelect.module.scss';
import { OptionT } from 'app/types/OptionT';

interface Props {
  options: OptionT[];
  placeholder?: string;
  onChange?: (option: OptionT) => void;
  className?: string;
  title?: string;
  error?: string;
  value?: OptionT;
  defaultValue?: OptionT;
}

const CustomSelect: FC<Props> = props => {
  const { options, placeholder, className, onChange, title, value, error, defaultValue } = props;
  const id = useId();
  const instanceId = useId();
  const handleChange = (v: SingleValue<OptionT> | null, actionMeta: ActionMeta<OptionT>) => {
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
        // value={options.filter(option => option.value === 'hidden')}
        value={value}
        components={{ IndicatorSeparator: () => null }}
        defaultValue={defaultValue}
        // selectedValue={{ value: 'hidden', label: 'Заблокированный' }}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default CustomSelect;
