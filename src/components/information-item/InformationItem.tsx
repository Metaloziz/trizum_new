import cn from 'classnames';
import { FC } from 'react';
import InputFile from '@components/input-file/InputFile';
import CustomSelect from '@components/select/CustomSelect';
import TextFieldCalendar from '@components/text-field-calendar/TextFieldCalendar';
import TextField from '@components/text-fild/TextFild';
import styles from './InformationItem.module.scss';

type VariantType = 'select' | 'input' | 'calendar' | 'file';

type SizeType = 'large' | 'normal';

interface Option {
  value: string;
  label: string;
}

interface Props {
  title?: string;
  variant: VariantType;
  option?: Option[];
  size?: SizeType;
  placeholder?: string;
  dataAuto?: string;
  onChange?: (value: string) => void;
  id?: string;
  type?: string;
  value?: string;
}

const InformationItem: FC<Props> = (props) => {
  const {
    title,
    variant,
    option = [],
    size = 'normal',
    placeholder = '',
    dataAuto = '',
    onChange,
    id,
    type,
  } = props;
  return (
    <div className={styles.wrapBlockItem}>
      <div>
        <p>{title}</p>
      </div>
      <div className={cn(styles.content, size === 'large' && styles.large)}>
        {variant === 'select' && (
          <CustomSelect options={option} placeholder={placeholder} />
        )}
        {variant === 'input' && (
          <TextField
            onChange={onChange}
            id={id}
            placeholder={placeholder}
            type={type}
          />
        )}
        {variant === 'calendar' && <TextFieldCalendar dataAuto={dataAuto} />}
        {variant === 'file' && <InputFile />}
      </div>
    </div>
  );
};

export default InformationItem;
