import { useState, ChangeEvent, FC } from 'react';

import CustomButton from '@components/custom-button/CustomButton';
import InformationItem from '@components/information-item/InformationItem';
import { newstatus, tariff, month } from '@components/moks-data/moks-data-tariff';
import TextEditor from '@components/text-editor/TextEditor';

import styles from './TariffPage.module.scss';

const TariffPage: FC = () => {
  const [currentRadioValue, setCurrentRadioValue] = useState('twoChildren');
  const handlerRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentRadioValue(e.currentTarget.value);
  };

  return (
    <div className={styles.traffic}>
      <div className={styles.content}>
        <div className={styles.innerContent}>
          <div>
            <div className={styles.inputBlock}>
              <InformationItem
                variant="input"
                onChange={valueText => console.log(valueText)}
                placeholder="имя тарифа"
              />
            </div>
            <div className={styles.infoBlock}>
              <div>
                <InformationItem
                  title='Статус'
                  variant='select'
                  option={newstatus}
                  placeholder='Активен'
                />
                <InformationItem
                  title='Дата начала действия'
                  variant='calendar'
                  dataAuto='dateAction'
                />
                <InformationItem
                  title='Дата окончания действия'
                  variant='calendar'
                  dataAuto='endAction'
                />
                <InformationItem
                  title='Тариф после'
                  variant='select'
                  option={tariff}
                  placeholder='Тариф 1'
                />
              </div>
              <div>
                <InformationItem
                  title='Старая цена'
                  variant='input'
                  onChange={valueText => console.log(valueText)}
                />
                <InformationItem
                  title='Новая цена'
                  variant='input'
                  onChange={valueText => console.log(valueText)}
                />
                <InformationItem
                  title='Код тарифа'
                  variant='input'
                  onChange={valueText => console.log(valueText)}
                />
              </div>
            </div>
          </div>
          <div className={styles.editorInfo}>
            <h3>Описание</h3>
            <div className={styles.editorBlock}>
              <div className={styles.editorWrapper}>
                <TextEditor />
              </div>
              <div className={styles.choiceTariff}>
                <div className={styles.inputTariff}>
                  <div>
                    <input
                      type="radio"
                      value="twoChildren"
                      id="twoChildren"
                      name="currentRadioValue"
                      onChange={handlerRadioChange}
                      checked={currentRadioValue === 'twoChildren'}
                    />
                  </div>
                  <label htmlFor="twoChildren">Тариф для второго ребёнка</label>
                </div>
                <div className={styles.inputTariff}>
                  <div>
                    <input
                      type="radio"
                      value="registration"
                      id="registration"
                      name="currentRadioValue"
                      onChange={handlerRadioChange}
                      checked={currentRadioValue === 'registration'}
                    />
                  </div>
                  <label htmlFor="registration">
                    Тариф для новых клиентов (активируется при регистрации)
                  </label>
                </div>
                <div className={styles.inputTariff}>
                  <div>
                    <input
                      type="radio"
                      value="firstPayment"
                      id="firstPayment"
                      name="currentRadioValue"
                      onChange={handlerRadioChange}
                      checked={currentRadioValue === 'firstPayment'}
                    />
                  </div>
                  <label htmlFor="firstPayment">
                    Тариф для новых клиентов (предполагается при первой оплате)
                  </label>
                </div>
                <div className={styles.selectTraffic}>
                  <InformationItem
                    title='Сколько месяцев действует'
                    variant='select'
                    option={month}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.btnTraffic}>
        <div className={styles.listTariff}>
          <CustomButton>Список тарифов</CustomButton>
        </div>
        <CustomButton>Сохранить</CustomButton>
      </div>
    </div>
  );
};

export default TariffPage;
