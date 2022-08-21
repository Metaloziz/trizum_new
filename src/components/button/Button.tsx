import React, { FC, ReactElement, useState } from 'react';

import Button, { ButtonProps } from '@mui/material/Button';
import cn from 'classnames';

import buttonImage from 'assets/svgs/arrow-btn.svg';
import iconExelHover from 'assets/svgs/btn-excel-hover.svg';
import iconExel from 'assets/svgs/btn-excel.svg';
import iconParents from 'assets/svgs/parents.svg';
import iconPlus from 'assets/svgs/plus.svg';
import iconPlusHover from 'assets/svgs/plusHover.svg';
import resetX from 'assets/svgs/reset-btn.svg';
import smallArrow from 'assets/svgs/small-arrow.svg';
import styles from 'components/button/Button.module.scss';
import Image from 'components/image/Image';

type ButtonVariantType =
  | 'parents'
  | 'bigButton'
  | 'addUser'
  | 'addExel'
  | 'primary'
  | 'none'
  | 'arrow'
  | 'reset';

type ButtonSize = 'large' | 'small' | 'thin';

export type ButtonPropsT = {
  children?: React.ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariantType;
} & Omit<ButtonProps, 'size' | 'variant'>;

const Button1: FC<ButtonPropsT> = props => {
  const { children, disabled, size, variant, onClick, ...rest } = props;
  const [isShowHover, setShowHover] = useState<boolean>(false);
  let iconButton: ReactElement;
  let sx = {
    background: '#2675F6',
    fontFamily: 'Montserrat',
    padding: '16px 58px 17px 18px',
    color: '#fff',
    borderRadius: '25px',
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '17px',
    cursor: 'pointer',
    textTransform: 'none!important',
    transition: 'background .3s ease-in',
    '&:hover': {
      background: '#38028F',
    },
    '&:disabled': {
      background: '#8A8A8A',
    },
  };
  const none = {
    padding: '7px 18px',
  };
  const primary = {
    background: '#292EF9',
  };
  const addExelOrUser = {
    background: '#7F28D9',
    '&:hover': {
      background: '#2E8EFE',
    },
  };
  const bigButton = {
    background: '#292EF9',
    borderRadius: '90px',
    textTransform: 'uppercase',
    '&:hover': {
      background: '#2E8EFE',
    },
  };
  const parents = {
    background: '#B4DEFF',
    color: '#38028F',
    '&:hover': {
      background: '#72CEF3',
    },
  };
  const reset = {
    background: '#DB5552',
    '&:hover': {
      background: '#d21914',
    },
  };
  const small = {
    padding: '12px 58px 11px 18px',
  };
  const thin = {
    padding: '7px 70px 7px 18px',
    maxHeight: '30px',
  };
  const large = {
    width: '200px',
    height: '70px',
  };

  switch (size) {
    case 'small':
      sx = { ...sx, ...small };
      break;
    case 'large':
      sx = { ...sx, ...large };
      break;
    case 'thin':
      sx = { ...sx, ...thin };
      break;
    default:
      sx = { ...sx };
  }

  switch (variant) {
    case 'parents':
      sx = { ...sx, ...parents };
      iconButton = <Image src={iconParents} alt="parents" width={20} height={16} />;
      break;
    case 'bigButton':
      sx = { ...sx, ...bigButton };
      iconButton = <Image src={buttonImage} alt="arrow" width={36} height={19} />;
      break;
    case 'addUser':
      sx = { ...sx, ...addExelOrUser };
      iconButton = isShowHover ? (
        <Image src={iconPlusHover} alt="plus" width={18} height={18} />
      ) : (
        <Image src={iconPlus} alt="plus" width={18} height={18} />
      );
      break;
    case 'addExel':
      sx = { ...sx, ...addExelOrUser };
      iconButton = isShowHover ? (
        <Image src={iconExelHover} alt="exel" width={14} height={19} />
      ) : (
        <Image src={iconExel} alt="exel" width={14} height={19} />
      );
      break;
    case 'primary':
      sx = { ...sx, ...primary };
      iconButton = <Image src={smallArrow} alt="arrow" width={16} height={10} />;
      break;
    case 'reset':
      sx = { ...sx, ...reset };
      iconButton = <Image src={resetX} alt="reset" width={18} height={18} />;
      break;
    case 'none':
      sx = { ...sx, ...none };
      iconButton = <></>;
      break;
    default:
      sx = { ...sx, ...primary };
      iconButton = <Image src={buttonImage} alt="arrow" width={26} height={13} />;
  }

  return (
    <Button
      sx={sx}
      onClick={onClick}
      onMouseOver={() => setShowHover(true)}
      onMouseOut={() => setShowHover(false)}
      disabled={disabled}
      {...rest}
    >
      {children}
      {variant !== 'none' && (
        <span
          className={cn(
            styles.arrowBtn,
            size === 'large' && styles.arrowBtnL,
            size === 'small' && styles.arrowBtnS,
            size === 'thin' && styles.arrowBtnT,
          )}
        >
          {iconButton}
        </span>
      )}
    </Button>
  );
};

export default Button1;
