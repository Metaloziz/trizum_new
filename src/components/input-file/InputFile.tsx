import { ChangeEvent, useState } from 'react';
import styles from './InputFile.module.scss';

const InputFile = () => {
  const [fileName, setFileName] = useState('');

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
      </label>
    </div>
  );
};

export default InputFile;
