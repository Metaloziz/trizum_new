import { FC } from 'react';

import InputFile from '@components/input-file/InputFile';
import CustomSelect from '@components/select/CustomSelect';
import TextFieldCalendar from '@components/text-field-calendar/TextFieldCalendar';
import TextField from '@components/text-field/TextField';
import cn from 'classnames';

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
  className?: string;
  inputClassName?: string;
  onChange?: (value: string) => void;
  id?: string;
  type?: string;
  value?: string;
}

const InformationItem: FC<Props> = props => {
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
    className,
    inputClassName,
    value,
  } = props;

  let part;
  switch (variant) {
    case 'calendar':
      part = <TextFieldCalendar dataAuto={dataAuto} value={value} onChange={onChange} />;
      break;
    case 'select':
      part = <CustomSelect options={option} placeholder={placeholder} />;
      break;
    case 'file':
      part = <InputFile />;
      break;
    case 'input':
    default:
      part = <TextField onChange={onChange} id={id} placeholder={placeholder} type={type} />;
  }
  return (
    <div className={cn(styles.wrapBlockItem, className)}>
      {title && <p>{title}</p>}
      <div className={cn(styles.content, size === 'large' && styles.large, inputClassName)}>
        {part}
      </div>
    </div>
  );
};

InformationItem.defaultProps = {
  title: '',
  option: [],
  size: 'normal',
  placeholder: '',
  dataAuto: '',
  className: '',
  inputClassName: '',
  onChange: () => {},
  id: '',
  type: '',
  value: '',
};

export default InformationItem;
