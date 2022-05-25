import Image from 'next/image';
import { FC } from 'react';
import Select from 'react-select';
import selectArrow from '@svgs/arrow-select.svg';
import styles from './CustomSelect.module.scss';

interface SelectOptions {
  label: string;
  value: string;
}

interface Props {
  options: SelectOptions[];
  placeholder?: string;
  // id: string;
}

const CustomSelect: FC<Props> = ({ options, placeholder }) => {
  return (
    <div className={styles.selectWrap}>
      <div className={styles.selectArrow}>
        <Image src={selectArrow} alt={'arrow'} />
      </div>
      <Select
        // instanceId={}
        // id={'6'}
        // inputId={instanceId}
        placeholder={placeholder}
        options={options}
        components={{ IndicatorSeparator: () => null }}
      />
    </div>
  );
};

export default CustomSelect;
