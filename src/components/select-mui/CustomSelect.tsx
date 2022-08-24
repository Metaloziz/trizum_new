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
    };


    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{title}</InputLabel>
                <Select
                    ref={ref}
                    labelId="demo-simple-select-label"
                    id={id}
                    value={value}
                    label="Роль"
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    onChange={() => {
                    }}
                >
                    {options.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                    <FormHelperText>{error}</FormHelperText>
                </Select>
            </FormControl>
        </div>
    )
});

export default CustomSelect;
