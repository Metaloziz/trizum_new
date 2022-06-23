import { FC, useId } from 'react';

import selectArrow from '@svgs/arrow-select.svg';
import cn from 'classnames';
import Image from 'next/image';
import Select, { OnChangeValue, SingleValue } from 'react-select';

import styles from './CustomSelect.module.scss';

interface SelectOptions {
  label: string;
  value: string;
}

interface Props {
  options: SelectOptions[];
  placeholder?: string;
  onChange?: (option: SingleValue<SelectOptions>) => void;
  className?: string;
}

const CustomSelect: FC<Props> = props => {
  const { options, placeholder, className, onChange } = props;
  const id = useId();
  const instanceId = useId();
  const handleChange = (value: SingleValue<SelectOptions>) => {
    onChange && onChange(value);
  };
  return (
    <div className={cn(styles.selectWrap, className)}>
      <div className={styles.selectArrow}>
        <Image src={selectArrow} alt="arrow" />
      </div>
      <Select
        id={id}
        instanceId={instanceId}
        placeholder={placeholder}
        options={options}
        onChange={handleChange}
        components={{ IndicatorSeparator: () => null }}
      />
    </div>
  );
};

CustomSelect.defaultProps = {
  placeholder: undefined,
  onChange: undefined,
  className: undefined,
};

export default CustomSelect;
