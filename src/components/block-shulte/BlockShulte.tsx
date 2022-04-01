import ButtonPlay from '@components/button-play/ButtonPlay';
import styles from './BlockShulte.module.scss';

const BlockShulte = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.blockShulte}>
          <div>
            <img src='/table.jpg' alt='table' />
          </div>
          <ButtonPlay />
        </div>
        <div className={styles.tableBtn}>
          <div></div>
          <div></div>
        </div>
        <div className={styles.leftBtn}></div>
      </div>
      <div className={styles.textShulte}>
        <h2>Таблица Шульте</h2>
        <p>
          Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта: реализация намеченных
          плановых заданий создаёт необходимость включения в производственный план целого ряда внеочередных мероприятий с учётом комплекса
          глубокомысленных рассуждений. Как принято считать, сторонники тоталитаризма в науке, превозмогая сложившуюся непростую
          экономическую ситуацию, своевременно верифицированы.
        </p>
      </div>
    </div>
  );
};
export default BlockShulte;
