import { FC } from 'react';
import Select from 'react-select';
import styles from './CustomSelect.module.scss';

interface SelectOptions {
  label: string;
  value: string;
}

interface Props {
  options: SelectOptions[];
  placeholder: string;
  label?: string;
  additionalCn?: string;
}

const CustomSelect: FC<Props> = ({
  options,
  placeholder,
  label,
  additionalCn,
}) => {
  const wrapper = `${styles.selectWrap} ${additionalCn ? additionalCn : ''}`;
  return (
    <div className={wrapper}>
      {label && <p className={styles.label}>{label}</p>}
      <Select
        // instanceId={+Date.now()}
        placeholder={placeholder}
        options={options}
        components={{ IndicatorSeparator: () => null }}
      />
    </div>
  );
};

export default CustomSelect;
