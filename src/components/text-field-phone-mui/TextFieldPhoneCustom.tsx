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


const TextFieldPhoneCustom: FC<Props> = ({type, onChange, value, error, label, ...rest}) => {
    /* <div className={styles.textField}>
      {label && <p>{label}</p>}
      <input {...rest} onChange={onChange} value={value} type={type || 'text'} />
      {error && <p className={styles.error}>{error}</p>}
    </div> */

    return (

        <MuiPhoneNumber
            value={value}
            defaultCountry="ru"
            onlyCountries={['ru']}
            variant="outlined"
            fullWidth
            size="small"
            countryCodeEditable={false}
            error={!!error}
            label={label}
            helperText={error}
            onChange={onChange}
        />
    )
};
export default TextFieldPhoneCustom;
