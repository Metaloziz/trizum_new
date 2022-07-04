import { useState } from 'react';

import styles from './BtnExcelImg.module.scss';

import btnExcelHover from 'assets/svgs/btn-excel-hover.svg';
import btnExcel from 'assets/svgs/btn-excel.svg';
import Button from 'components/button/Button';
import Image from 'components/image/Image';

const BtnExcelImg = () => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className={styles.excel}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <Button>Выгрузиль в Excel</Button>
      <div className={styles.excelPic}>
        <Image src={hover ? btnExcelHover : btnExcel} alt="excel" width={14} height={19} />
      </div>
    </div>
  );
};

export default BtnExcelImg;
