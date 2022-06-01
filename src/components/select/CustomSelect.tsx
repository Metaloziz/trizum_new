import Image from 'next/image';
import {FC, useId} from 'react';
import Select, {OnChangeValue} from 'react-select';
import selectArrow from '@svgs/arrow-select.svg';
import styles from './CustomSelect.module.scss';

interface SelectOptions {
  label: string;
  value: string;
}

interface Props {
  options: SelectOptions[];
  placeholder?: string;
  onChange?:OnChangeValue<any, any>
  // id: string;
}

const CustomSelect: FC<Props> = ({ options, placeholder }) => {
  const id = useId()
  const instanceId = useId()
  return (
    <div className={styles.selectWrap}>
      <div className={styles.selectArrow}>
        <Image src={selectArrow} alt={'arrow'} />
      </div>
      <Select
        id={id}
        instanceId={instanceId}
        placeholder={placeholder}
        options={options}
        onChange={(asd)=>onChange(asd)}
        components={{ IndicatorSeparator: () => null }}
      />
    </div>
  );
};

export default CustomSelect;
