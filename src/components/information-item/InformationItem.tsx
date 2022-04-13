import { FunctionComponent } from 'react';
import CustomSelect from '@components/select/CustomSelect';
import TextFieldCalendar from '@components/text-field-calendar/TextFieldCalendar';
import TextField from '@components/text-fild/TextFild';
import styles from './InformationItem.module.scss';

type VariantType = 'select' | 'input' | 'calendar';

type SizeType = 'large' | 'normal';

interface Option {
  value: string;
  label: string;
}

interface Props {
  title: string;
  variant: VariantType;
  option?: Option[];
  size?: SizeType;
}

const InformationItem: FunctionComponent<Props> = ({
  title,
  variant,
  option = [],
  size = 'normal',
}) => {
  const finalStyle = `${styles.content} ${
    size === 'large' ? styles.large : ''
  }`;
  return (
    <div className={styles.wrapBlockItem}>
      <div>
        <p>{title}</p>
      </div>
      <div className={finalStyle}>
        {variant === 'select' && (
          <CustomSelect options={option} placeholder={' '} />
        )}
        {variant === 'input' && <TextField />}
        {variant === 'calendar' && <TextFieldCalendar />}
      </div>
    </div>
  );
};

export default InformationItem;
