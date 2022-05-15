import React, { ChangeEvent, FC } from 'react'
import styles from './TextFild.module.scss'

interface Props {
  type?: string;
  id?: string;
  label?: string;
  value?: string;
  onChange?: (val: string) => void;
}

const TextField: FC<Props> = (props) => {
  const {type, id, label, value, onChange} = props
  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e.target.value)
  }
  return (
    <div className={ styles.textField }>
      { label && <label htmlFor={ label }>{ label }</label> }
      <input
        type={ type ? type : 'text' }
        id={ label ? label : id }
        value={ value || '' }
        onChange={ onChangeText }
      />
    </div>
  )
}

export default TextField
