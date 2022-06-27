import { FC, useId } from 'react';

import selectArrow from '@svgs/arrow-select.svg';
import cn from 'classnames';
import Image from 'next/image';
import Select, { OnChangeValue } from 'react-select';

import styles from './CustomSelect.module.scss';

interface SelectOptions {
  label: string;
  value: string;
}

interface Props {
  options: SelectOptions[];
  placeholder?: string;
  onChange?: OnChangeValue<any, any>;
  className?: string;
  // id: string;
}

const CustomSelect: FC<Props> = ({ options, placeholder, className, onChange }) => {
  const id = useId();
  const instanceId = useId();
  return (
    <div className={cn(styles.selectWrap, className)}>
      <Select
        id={id}
        instanceId={instanceId}
        placeholder={placeholder}
        options={options}
        onChange={value => onChange(value)}
        components={{ IndicatorSeparator: () => null }}
      />
    </div>
  );
};

CustomSelect.defaultProps = {
  placeholder: '',
  onChange: () => {
  },
  className: '',
};

export default CustomSelect;
