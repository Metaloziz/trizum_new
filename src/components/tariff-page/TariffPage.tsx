import { useState, ChangeEvent, FC } from 'react';

import styles from './TariffPage.module.scss';

import Button from 'components/button/Button';
import InformationItem from 'components/information-item/InformationItem';
import { newstatus, tariff, month } from 'components/moks-data/moks-data-tariff';
import TextEditor from 'components/text-editor/TextEditor';

const TariffPage: FC = () => {
  const [currentRadioValue, setCurrentRadioValue] = useState('twoChildren');
  const handlerRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentRadioValue(e.currentTarget.value);
  };
  const fake = () => {};
  return (
    <div className={styles.traffic}>
      <div className={styles.content}>
        <div className={styles.innerContent}>
          <div>
            <div className={styles.inputBlock}>
              <InformationItem variant="input" onChange={fake} placeholder="имя тарифа" />
            </div>
            <div className={styles.infoBlock}>
              <div>
                <InformationItem
                  title="Статус"
                  variant="select"
                  option={newstatus}
                  placeholder="Активен"
                />
                <InformationItem
                  title="Дата начала действия"
                  variant="calendar"
                  dataAuto="dateAction"
                />
                <InformationItem
                  title="Дата окончания действия"
                  variant="calendar"
                  dataAuto="endAction"
                />
                <InformationItem
                  title="Тариф после"
                  variant="select"
                  option={tariff}
                  placeholder="Тариф 1"
                />
              </div>
              <div>
                <InformationItem title="Старая цена" variant="input" onChange={fake} />
                <InformationItem title="Новая цена" variant="input" onChange={fake} />
                <InformationItem title="Код тарифа" variant="input" onChange={fake} />
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
                    title="Сколько месяцев действует"
                    variant="select"
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
          <Button>Список тарифов</Button>
        </div>
        <Button>Сохранить</Button>
      </div>
    </div>
  );
};

export default TariffPage;
