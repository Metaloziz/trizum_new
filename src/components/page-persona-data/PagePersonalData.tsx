import Image from 'next/image';
import { FunctionComponent } from 'react';
import styles from './PagePersonalData.module.scss';

const PagePersonalData: FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.wrapperUser}>
          <div className={styles.userPic}>
            <Image src='/user.svg' width='126' height='126' alt='NextJS' />
          </div>
          <div className={styles.userSetting}>
            <Image src='/setting.svg' width='25' height='25' alt='NextJS' />
          </div>
        </div>
      </div>
      <div className={styles.userData}>
        <h2>Днепровский Александр Алексеевич</h2>
        <form>
          <div>
            <label>Телефон:</label>
            <input />
          </div>
          <div>
            <label>Почта:</label>
            <input />
          </div>
          {/*<button type="submit">Sign in</button>*/}
        </form>
      </div>
    </div>
  );
};

export default PagePersonalData;
