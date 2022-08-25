import {ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes} from 'react';
import MuiPhoneNumber from "material-ui-phone-number";
import * as React from "react";


type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    value: string;
    label?: string;
    error?: string;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string
    ) => void;
}


const TextFieldPhoneCustom: FC<Props> = ({type, onChange, value, error, label, ...rest}) =>(
        <MuiPhoneNumber
            value={value}
            defaultCountry="ru"
            onlyCountries={['ru']}
            variant="outlined"
            fullWidth
            /* size="small" */
            countryCodeEditable={false}
            error={!!error}
            label={label}
            helperText={error}
            onChange={onChange}
        />
);
export default TextFieldPhoneCustom;
