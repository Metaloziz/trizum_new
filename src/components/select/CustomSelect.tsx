import { FunctionComponent } from 'react';
import Select from 'react-select';
import styles from './CustomSelect.module.scss';

interface SelectOptions {
  label: string;
  value: string;
}

interface Props {
  options: SelectOptions[];
  placeholder: string;
}

const CustomSelect: FunctionComponent<Props> = ({ options, placeholder }) => {
  return (
    <div className={styles.selectWrap}>
      <Select
        classNamePrefix={styles.customWrapper}
        placeholder={placeholder}
        options={options}
        components={{ IndicatorSeparator: () => null }}
      />
    </div>
  );
};

export default CustomSelect;
