import Image from 'next/image';
import { useState } from 'react';
import Button from '@components/button/Button';
import btnExcelHover from '@svgs/btn-excel-hover.svg';
import btnExcel from '@svgs/btn-excel.svg';
import styles from './BtnExcelImg.module.scss';

const BtnExcelImg = () => {
  const [hover, setHover] = useState(false);
  return (
    <div className={styles.excel} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
      <Button>Выгрузиль в Excel</Button>
      <div className={styles.excelPic}>
        <Image src={hover ? btnExcelHover : btnExcel} alt={'excel'} width={14} height={19} />
      </div>
    </div>
  );
};

export default BtnExcelImg;
