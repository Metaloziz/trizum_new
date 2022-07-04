import { ChangeEvent, useState } from 'react';

import styles from './InputFile.module.scss';

import download from 'assets/svgs/download.svg';
import Image from 'components/image/Image';

const InputFile = () => {
  const [fileName, setFileName] = useState('Drag-n-Drop');

  const getFileName = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (files && files.length > 0) {
      setFileName(files[0].name);
    }
  };

  return (
    <div className={styles.uploadFile}>
      <label htmlFor="file" className={styles.fileUpp}>
        <div className={styles.textFile}>
          <span id="text">{fileName}</span>
        </div>
        <input type="file" onChange={getFileName} id="file" />
        <div className={styles.download}>
          <Image src={download} alt="download" width="20" height="20" />
        </div>
      </label>
    </div>
  );
};

export default InputFile;
