import React, { useState, ChangeEvent, FC } from 'react';

import { observer } from 'mobx-react';
import moment from 'moment';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'moment-timezone';

import CustomDatePicker from './customDatePicker';
import styles from './TariffPage.module.scss';

import Button from 'components/button/Button';
import InformationItem from 'components/information-item/InformationItem';
import { newstatus, tariff, month } from 'components/moks-data/moks-data-tariff';
import TextEditor from 'components/text-editor/TextEditor';

type Props = {
  store: any;
};

const TariffPage: FC<Props> = observer(({ store }) => {
  console.log('editingEntity', { ...store.editingEntity });
  const [currentRadioValue, setCurrentRadioValue] = useState('twoChildren');

  const handlerRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentRadioValue(e.currentTarget.value);
    console.log('setvalue', currentRadioValue);
    console.log('e.currentTarget.value', e.currentTarget.value);
    if (e.currentTarget.value === 'twoChildren') {
      store.editingEntity.forSecondChild = true;
      store.editingEntity.forFirstPay = false;
      store.editingEntity.forNewClient = false;
    }
    if (e.currentTarget.value === 'registration') {
      store.editingEntity.forSecondChild = false;
      store.editingEntity.forFirstPay = false;
      store.editingEntity.forNewClient = true;
    }
    if (e.currentTarget.value === 'firstPayment') {
      store.editingEntity.forSecondChild = false;
      store.editingEntity.forFirstPay = true;
      store.editingEntity.forNewClient = false;
    }
  };

  return (
    <div className={styles.traffic}>
      <div className={styles.content}>
        <div className={styles.innerContent}>
          <div>
            <div className={styles.inputBlock}>
              <InformationItem
                variant="input"
                value={store.editingEntity.name}
                onChange={data => {
                  store.editingEntity.name = data;
                }}
                placeholder="имя тарифа"
              />
            </div>
            <div className={styles.infoBlock}>
              <div>
                <InformationItem
                  title="Статус"
                  variant="select"
                  value={store.editingEntity.status}
                  option={newstatus}
                  onChangeSelect={data => {
                    store.editingEntity.status = data.value;
                  }}
                  placeholder="Активен"
                />
                <div>
                  <CustomDatePicker
                    value={store.editingEntity.startedAt.date}
                    setValue={(data: any) => {
                      store.editingEntity.startedAt = {
                        date: moment(data).format('YYYY-MM-DD hh:mm:ss.000000'),
                        timezone_type: data.getTimezoneOffset() / 60,
                        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                      };
                    }}
                    label="Дата начала действия"
                  />
                </div>
                <div>
                  <CustomDatePicker
                    value={store.editingEntity.endedAt.date}
                    setValue={(data: any) => {
                      store.editingEntity.endedAt = {
                        date: moment(data).format('YYYY-MM-DD hh:mm:ss.000000'),
                        timezone_type: data.getTimezoneOffset() / 60,
                        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                      };
                    }}
                    label="Дата окончания действия"
                  />
                </div>
                {/* <InformationItem */}
                {/*  title="Тариф после" */}
                {/*  variant="select" */}
                {/*  option={tariff} */}
                {/*  placeholder="Тариф 1" */}
                {/* /> */}
              </div>
              <div>
                <InformationItem
                  title="Старая цена"
                  variant="input"
                  value={store.editingEntity.oldPrice}
                  onChange={data => {
                    store.editingEntity.oldPrice = data;
                  }}
                />
                <InformationItem
                  title="Новая цена"
                  variant="input"
                  value={store.editingEntity.newPrice}
                  onChange={data => {
                    store.editingEntity.newPrice = data;
                  }}
                />
                <InformationItem
                  title="Код тарифа"
                  variant="input"
                  value={store.editingEntity.code}
                  onChange={data => {
                    store.editingEntity.code = data;
                  }}
                />
              </div>
            </div>
          </div>
          <div className={styles.editorInfo}>
            <h3>Описание</h3>
            <div className={styles.editorBlock}>
              <div className={styles.editorWrapper}>
                <TextEditor
                  onChange={date => {
                    let allText = '';
                    date?.blocks?.forEach((item: any) => {
                      allText += item.text;
                    });
                    store.editingEntity.description = allText;
                  }}
                />
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
                {/* <div className={styles.selectTraffic}> */}
                {/* <InformationItem */}
                {/*  title="Сколько месяцев действует" */}
                {/*  variant="select" */}
                {/*  option={month} */}
                {/* /> */}
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.btnTraffic}>
        <div className={styles.listTariff}>
          <Button>Список тарифов</Button>
        </div>
        <Button>{store.editingEntity?.id ? 'Изменить' : 'Сохранить'}</Button>
      </div>
    </div>
  );
});

export default TariffPage;
