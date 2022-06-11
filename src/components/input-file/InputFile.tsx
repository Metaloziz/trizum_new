import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import download from '@svgs/download.svg';
import styles from './InputFile.module.scss';

const InputFile = () => {
  const [fileName, setFileName] = useState('Drag-n-Drop');

  const getFileName = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      setFileName(files[0].name);
    }
  };

  return (
    <div className={styles.uploadFile}>
      <label htmlFor={'file'} className={styles.fileUpp}>
        <div className={styles.textFile}>
          <span id={'text'}>{fileName}</span>
        </div>
        <input type={'file'} onChange={getFileName} id={'file'} />
        <div className={styles.download}>
          <Image src={download} alt={'download'} width={'20'} height={'20'} />
        </div>
      </label>
    </div>
  );
};

export default InputFile;
