import Image from 'next/image';
import React from 'react';
import CustomButton from '@components/custom-button/CustomButton';
import TextEditor from '@components/text-editor/TextEditor';
import buttonImage from '@svgs/arrow-onleft-btn.svg';
import styles from './PageSettingGames.module.scss';

const PageSettingGames = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <div className={styles.back}>
          <button className={styles.buttonArrow}>
            <Image src={buttonImage} alt={'arrow'} width={26} height={13} />
          </button>
          <span>На предидущую страницу</span>
        </div>
        <div className={styles.infoButton}>
          <button className={styles.buttonGroup}>Для младшей группы</button>
          <span>Тестовый</span>
          <button className={styles.buttonAdd}>+</button>
        </div>
      </div>

      <div className={styles.configuration}>
        <div>
          <div className={styles.templateName}>
            <span>Наименование шаблона</span>
            <div className={styles.pattern}>Шаблон 1</div>
          </div>

          <div className={styles.settingLevels}>
            <h5>Настройка уровней</h5>

            <div className={styles.rowSettings}>
              <h6>Уровней</h6>
              <div>
                <span>от</span>
                <input type="number" />
              </div>
              <div>
                <span>до</span>
                <input type="number" />
              </div>
            </div>

            <div className={styles.rowSettings}>
              <h6>Шариков</h6>
              <div>
                <span>от</span>
                <input type="number" />
              </div>
              <div>
                <span>до</span>
                <input type="number" />
              </div>
            </div>

            <div className={styles.rowSettings}>
              <h6>Миганий</h6>
              <div>
                <span>от</span>
                <input type="number" />
              </div>
              <div>
                <span>до</span>
                <input type="number" />
              </div>
            </div>

            <div className={styles.rowSettings}>
              <h6>Скорость</h6>
              <div>
                <span>от</span>
                <input type="number" />
              </div>
              <div>
                <span>до</span>
                <input type="number" />
              </div>
            </div>

            <div className={styles.rowSettings}>
              <span>Время выполнения</span>
              <input type="number" />
            </div>
          </div>
        </div>

        <div className={styles.accrualOfPoints}>
          <h5>Начисление баллов</h5>
          <div className={styles.radioGroup}>
            <label>
              <input type="radio" name="radio" />
              <span>За каждый пройденный уровень</span>
            </label>
            <label>
              <input type="radio" name="radio" />
              <span>Баллы за прыжок (начисляется если был прыжок и уровень пройден после прыжка)</span>
            </label>
            <label>
              <input type="radio" name="radio" />
              <span>Если ошибка, после прыжка, игру возвращаем на предыдущий уровень (штрафа нет)</span>
            </label>
          </div>
          <div className={styles.executionConditions}>
            <p>
              Если выполняет <input type="number" /> уровня подряд за <input type="number" /> секунд
            </p>
            <p>
              и <input type="number" /> % ошибок, то система <span>ПРЕДЛАГАЕТ</span> поднять на
            </p>
            <p>
              <input type="number" /> уровней один раз.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.commentsTitle}>память и ритм</div>
      <div className={styles.textEditorWrapper}>
        <TextEditor />
      </div>
      <div className={styles.buttonSaveWrapper}>
        <CustomButton>Сохранить</CustomButton>
      </div>
    </div>
  );
};

export default PageSettingGames;
