import Image from 'next/image';
import { FunctionComponent } from 'react';
import styles from './Modal.module.scss';

const Modal: FunctionComponent = () => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalButton}>
          <Image src='/button.svg' width='14' height='14' alt='NextJS' />
        </div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aut autem dignissimos doloremque dolores dolorum, ducimus eligendi
        ipsa magni molestias mollitia natus necessitatibus nulla omnis quae quasi quisquam ratione tempore? Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Beatae blanditiis dolorum laboriosam quis recusandae rem. Aperiam dolore est eveniet impedit inventore
        minus molestias nemo omnis, recusandae reiciendis reprehenderit repudiandae vel?
      </div>
    </div>
  );
};
export default Modal;
