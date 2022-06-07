import React, { FC } from 'react';
import InputFile from '@components/input-file/InputFile';
import CustomSelect from '@components/select/CustomSelect';
import TextFieldCalendar from '@components/text-field-calendar/TextFieldCalendar';
import TextField from '@components/text-fild/TextField';

type VariantType = 'select' | 'input' | 'calendar' | 'file';

interface Option {
  value: string;
  label: string;
}

interface Props {
  title: string;
  variant: VariantType;
  option?: Option[];
  dataAuto: string;
  onChange?: (value: string) => void;
}

const ListItemText: FC<Props> = (props) => {
  const { title, variant, option = [], dataAuto, onChange } = props;
  return (
    <div>
      <div>
        <p>{title}</p>
      </div>
      <div>
        {variant === 'select' && (
          <CustomSelect options={option} placeholder={' '} />
        )}
        {variant === 'input' && <TextField onChange={onChange} />}
        {variant === 'calendar' && <TextFieldCalendar dataAuto={dataAuto} />}
        {variant === 'file' && <InputFile />}
      </div>
    </div>
  );
};

export default ListItemText;
