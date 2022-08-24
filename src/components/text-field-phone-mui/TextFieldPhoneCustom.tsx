import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import MuiPhoneNumber from "material-ui-phone-number";


type Props = {
  value: string;
  label?: string;
  error?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;


const TextFieldPhoneCustom: FC<Props> = ({ type, onChange, value, error, label, ...rest }) => (
  /* <div className={styles.textField}>
    {label && <p>{label}</p>}
    <input {...rest} onChange={onChange} value={value} type={type || 'text'} />
    {error && <p className={styles.error}>{error}</p>}
  </div> */

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
        defaultValue={value}
        helperText={error}
        onChange={onChange}
    />
);
export default TextFieldPhoneCustom;
