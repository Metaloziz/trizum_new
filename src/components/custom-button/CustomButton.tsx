import Image from 'next/image';
import React, { FC, useState } from 'react';
import buttonImage from '@svgs/arrow-btn.svg';
import iconExelHover from '@svgs/btn-excel-hover.svg';
import iconExel from '@svgs/btn-excel.svg';
import iconParents from '@svgs/parents.svg';
import iconPlus from '@svgs/plus.svg';
import iconPlusHover from '@svgs/plusHover.svg';
import styles from './CustomButton.module.scss';

type ButtonType = 'parents' | 'bigButton' | 'addUser' | 'addExel';

type ButtonSize = 'large' | 'small';

interface Props {
  children?: React.ReactNode;
  size?: ButtonSize;
  type?: ButtonType;
  onClick?: () => void;
}

const Button: FC<Props> = ({ children, size, type, onClick }) => {
  const [isShowHover, setShowHover] = useState<boolean>(false);
  let iconButton = (
    <Image src={buttonImage} alt={'arrow'} width={26} height={13} />
  );
  let typeButtonStyle = '';
  switch (type) {
    case 'parents':
      typeButtonStyle = styles.parents;
      iconButton = (
        <Image src={iconParents} alt={'parents'} width={20} height={16} />
      );
      break;
    case 'bigButton':
      typeButtonStyle = styles.bigButton;
      iconButton = (
        <Image src={buttonImage} alt={'arrow'} width={36} height={19} />
      );
      break;
    case 'addUser':
      typeButtonStyle = styles.addUser;
      iconButton = isShowHover ? (
        <Image src={iconPlusHover} alt={'plus'} width={18} height={18} />
      ) : (
        <Image src={iconPlus} alt={'plus'} width={18} height={18} />
      );
      break;
    case 'addExel':
      typeButtonStyle = styles.addExel;
      iconButton = isShowHover ? (
        <Image src={iconExelHover} alt={'exel'} width={14} height={19} />
      ) : (
        <Image src={iconExel} alt={'exel'} width={14} height={19} />
      );
      break;
    default:
      typeButtonStyle = '';
  }
  let sizeButton = '';
  switch (size) {
    case 'small':
      sizeButton = styles.small;
      break;
    case 'large':
      sizeButton = styles.large;
      break;
    default:
      sizeButton = '';
  }

  const finalStyle = `${styles.customButton} ${typeButtonStyle} ${sizeButton}`;
  return (
    <button
      className={finalStyle}
      onClick={onClick}
      onMouseOver={() => setShowHover(true)}
      onMouseOut={() => setShowHover(false)}
    >
      <span className={styles.arrowBtn}>{iconButton}</span>
      {children}
    </button>
  );
};

export default Button;
