import React, { FC } from 'react';
import InputFile from '@components/input-file/InputFile';
import CustomSelect from '@components/select/CustomSelect';
import TextFieldCalendar from '@components/text-field-calendar/TextFieldCalendar';
import TextField from '@components/text-fild/TextFild';

type VariantType = 'select' | 'input' | 'calendar' | 'file';

interface Option {
  value: string;
  label: string;
}

interface Props {
  title: string;
  variant: VariantType;
  option?: Option[];
}

const ListItemText: FC<Props> = ({ title, variant, option = [] }) => {
  return (
    <div>
      <div>
        <p>{title}</p>
      </div>
      <div>
        {variant === 'select' && (
          <CustomSelect options={option} placeholder={' '} />
        )}
        {variant === 'input' && <TextField />}
        {variant === 'calendar' && <TextFieldCalendar />}
        {variant === 'file' && <InputFile />}
      </div>
    </div>
  );
};

export default ListItemText;
