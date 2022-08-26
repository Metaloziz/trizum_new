import React, {FC, forwardRef, useId} from 'react';

import cn from 'classnames';
import {ActionMeta, SingleValue} from 'react-select';

import styles from './CustomSelect.module.scss';
import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from "@mui/material";

export type Option = { label: string; value: string };

interface Props {
    options: Option[];
    placeholder?: string;
    onChange?: (option: Option) => void;
    className?: string;
    title?: string;
    error?: string;
    value?: Option;
    defaultValue?: Option;
}

const CustomSelect: FC<Props> = forwardRef((props, ref) => {
    const {options, placeholder, className, onChange, title, value, error, defaultValue} = props;
    const id = useId();
    const instanceId = useId();
    const handleChange = (v: SingleValue<Option> | null, actionMeta: ActionMeta<Option>) => {
        v && onChange && onChange(v);
    }

    const handleChange2 = (event: React.ChangeEvent<{ value: unknown }>) => {
        onChange && onChange(event.target.value as Option);
    }

    const handleChange3 = ()=>{}


 /* <div className={cn(styles.selectWrap, className)}>
        {title && <p className={styles.label}>{title}</p>}
        <Select
            id={id}
            instanceId={instanceId}
            placeholder={placeholder}
            options={options}
            onChange={handleChange}
            // value={options.filter(option => option.value === 'hidden')}
            value={value}
            components={{ IndicatorSeparator: () => null }}
            defaultValue={defaultValue}
            // selectedValue={{ value: 'hidden', label: 'Заблокированный' }}
        />
        {error && <p className={styles.error}>{error}</p>}
    </div> */

    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{title}</InputLabel>
                <Select
                    error={!!error}
                    ref={ref}
                    labelId="demo-simple-select-label"
                    id={id}
                    label={title}
                    value={value? value.value : ''}
                    onChange={handleChange3}
                >
                    {options.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText style={error ? {color: 'red'} : {}}> {error}</FormHelperText>
            </FormControl>
        </div>
    )
});

export default CustomSelect;
