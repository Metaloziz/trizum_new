import React, { ChangeEvent, FC, useState } from 'react';

import BackButton from '@components/backButton/BackButton';
import CustomButton from '@components/custom-button/CustomButton';
import InformationItem from '@components/information-item/InformationItem';
import TextEditor from '@components/text-editor/TextEditor';
import cn from 'classnames';

import styles from './PageSettingGames.module.scss';

interface Props {
  onChange?: (value: string) => void;
}

const PageSettingGames: FC<Props> = ({ onChange }) => {
  const [currentRadioValue, setCurrentRadioValue] = useState('level');
  const handlerRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentRadioValue(e.currentTarget.value);
  };
  // const [number, setNumber] = useState<string>('');
  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setNumber(e.target.value);
  //   onChange && onChange(e.target.value);
  // };
  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <div className={styles.back}>
          <BackButton />
        </div>
        <div className={styles.infoButton}>
          <button className={styles.buttonGroup} onClick={() => console.log('Для младшей группы')}>
            Для младшей группы
          </button>
          <span>Тестовый</span>
          <button className={styles.buttonAdd} onClick={() => console.log('Добавить')}>
            +
          </button>
        </div>
      </div>

      <div className={styles.configuration}>
        <div>
          <div className={styles.templateName}>
            <span>Наименование шаблона</span>
            <div className={styles.pattern}>
              <InformationItem
                variant="input"
                onChange={valueText => console.log(valueText)}
                placeholder="Шаблон 1"
              />
            </div>
          </div>
          <div className={styles.settingLevels}>
            <h5>Настройка уровней</h5>
            <div className={styles.rowSettings}>
              <h6>Уровней</h6>
              <div>
                <span>от</span>
                <InformationItem
                  type="number"
                  title=""
                  variant="input"
                  onChange={valueText => console.log(valueText)}
                />
              </div>
              <div>
                <span>до</span>
                <InformationItem
                  type="number"
                  title=""
                  variant="input"
                  onChange={valueText => console.log(valueText)}
                />
              </div>
            </div>
            <div className={styles.rowSettings}>
              <h6>Шариков</h6>
              <div>
                <span>от</span>
                <InformationItem
                  type="number"
                  title=""
                  variant="input"
                  onChange={valueText => console.log(valueText)}
                />
              </div>
              <div>
                <span>до</span>
                <InformationItem
                  type="number"
                  title=""
                  variant="input"
                  onChange={valueText => console.log(valueText)}
                />
              </div>
            </div>
            <div className={styles.rowSettings}>
              <h6>Миганий</h6>
              <div>
                <span>от</span>
                <InformationItem
                  type="number"
                  title=""
                  variant="input"
                  onChange={valueText => console.log(valueText)}
                />
              </div>
              <div>
                <span>до</span>
                <InformationItem
                  type="number"
                  title=""
                  variant="input"
                  onChange={valueText => console.log(valueText)}
                />
              </div>
            </div>
            <div className={styles.rowSettings}>
              <h6>Скорость</h6>
              <div>
                <span>от</span>
                <InformationItem
                  type="number"
                  title=""
                  variant="input"
                  onChange={valueText => console.log(valueText)}
                />
              </div>
              <div>
                <span>до</span>
                <InformationItem
                  type="number"
                  title=""
                  variant="input"
                  onChange={valueText => console.log(valueText)}
                />
              </div>
            </div>
            <div className={cn(styles.rowSettings, styles.timeExecution)}>
              <span>Время выполнения</span>
              <InformationItem
                type="number"
                title=""
                variant="input"
                onChange={valueText => console.log(valueText)}
              />
            </div>
          </div>
        </div>

        <div className={styles.accrualOfPoints}>
          <h5>Начисление баллов</h5>
          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                value="level"
                id="level"
                name="currentRadioValue"
                onChange={handlerRadioChange}
                checked={currentRadioValue === 'level'}
              />
              <span>За каждый пройденный уровень</span>
            </label>
            <label>
              <input
                type="radio"
                value=" jump"
                id=" jump"
                name="currentRadioValue"
                onChange={handlerRadioChange}
                checked={currentRadioValue === ' jump'}
              />
              <span>
                Баллы за прыжок (начисляется если был прыжок и уровень пройден после прыжка)
              </span>
            </label>
            <label>
              <input
                type="radio"
                value="errorJump"
                id="errorJump"
                name="currentRadioValue"
                onChange={handlerRadioChange}
                checked={currentRadioValue === 'errorJump'}
              />
              <span>
                Если ошибка, после прыжка, игру возвращаем на предыдущий уровень (штрафа нет)
              </span>
            </label>
          </div>
          <div className={styles.executionConditions}>
            <p>
              Если выполняет
              <InformationItem
                type="number"
                variant="input"
                onChange={valueText => console.log(valueText)}
              />
              уровня подряд за
              <InformationItem
                type="number"
                variant="input"
                onChange={valueText => console.log(valueText)}
              />
              секунд
            </p>
            <p>
              и
              <InformationItem
                type="number"
                title=""
                variant="input"
                onChange={valueText => console.log(valueText)}
              />
              % ошибок, то система <span>ПРЕДЛАГАЕТ</span> поднять на
            </p>
            <p>
              <InformationItem
                type="number"
                title=""
                variant="input"
                onChange={valueText => console.log(valueText)}
              />
              уровней один раз.
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
