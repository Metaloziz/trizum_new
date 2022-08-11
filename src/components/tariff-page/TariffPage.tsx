import React, { useState, ChangeEvent, FC, useEffect } from 'react';

import { observer } from 'mobx-react';
import moment from 'moment';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'moment-timezone';

import tariffsStore from '../../app/stores/tariffsStore';

import CustomDatePicker from './customDatePicker';
import styles from './TariffPage.module.scss';

import Button from 'components/button/Button';
import InformationItem from 'components/information-item/InformationItem';
import TextEditor from 'components/text-editor/TextEditor';

export const newstatus = [
  { value: 'active', label: 'Активный' },
  { value: 'deleted', label: 'Не активен' },
  { value: 'hidden', label: 'Заблокированный' },
];

const TariffPage: FC = observer(() => {
  const { editingEntity, addOrEdit, closeDialog } = tariffsStore;
  const [currentRadioValue, setCurrentRadioValue] = useState('twoChildren');

  useEffect(() => {
    if (editingEntity.forSecondChild) {
      setCurrentRadioValue('twoChildren');
    }
    if (editingEntity.forFirstPay) {
      setCurrentRadioValue('registration');
    }
    if (editingEntity.forNewClient) {
      setCurrentRadioValue('firstPayment');
    }
  }, []);

  const handlerRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentRadioValue(e.currentTarget.value);
    if (e.currentTarget.value === 'twoChildren') {
      editingEntity.forSecondChild = true;
      editingEntity.forFirstPay = false;
      editingEntity.forNewClient = false;
    }
    if (e.currentTarget.value === 'registration') {
      editingEntity.forSecondChild = false;
      editingEntity.forFirstPay = false;
      editingEntity.forNewClient = true;
    }
    if (e.currentTarget.value === 'firstPayment') {
      editingEntity.forSecondChild = false;
      editingEntity.forFirstPay = true;
      editingEntity.forNewClient = false;
    }
  };

  const editTariffs = () => {
    addOrEdit();
  };
  return (
    <div className={styles.traffic}>
      <div className={styles.content}>
        <div className={styles.innerContent}>
          <div>
            <div className={styles.inputBlock}>
              <InformationItem
                variant="input"
                value={editingEntity.name}
                onChange={data => {
                  editingEntity.name = data;
                }}
                placeholder="имя тарифа"
              />
            </div>
            <div className={styles.infoBlock}>
              <div>
                <InformationItem
                  title="Статус"
                  variant="select"
                  selectValue={newstatus.find((item: any) => item.value === editingEntity.status)}
                  option={newstatus}
                  onChangeSelect={data => {
                    editingEntity.status = data.value;
                  }}
                  placeholder="Активен"
                />
                <div style={{ margin: '25px 0 0 0' }}>
                  <CustomDatePicker
                    value={editingEntity.startedAt?.date}
                    setValue={(data: any) => {
                      editingEntity.startedAt = {
                        date: moment(data).format('YYYY-MM-DD hh:mm:ss.000000'),
                        timezone_type: data.getTimezoneOffset() / 60,
                        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                      };
                    }}
                    label="Дата начала действия"
                  />
                </div>
                <div style={{ margin: '25px 0 0 0' }}>
                  <CustomDatePicker
                    value={editingEntity.endedAt?.date}
                    setValue={(data: any) => {
                      editingEntity.endedAt = {
                        date: moment(data).format('YYYY-MM-DD hh:mm:ss.000000'),
                        timezone_type: data.getTimezoneOffset() / 60,
                        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                      };
                    }}
                    label="Дата окончания действия"
                  />
                </div>
              </div>
              <div>
                <InformationItem
                  title="Старая цена"
                  variant="input"
                  value={editingEntity.oldPrice}
                  onChange={data => {
                    editingEntity.oldPrice = data;
                  }}
                />
                <InformationItem
                  title="Новая цена"
                  variant="input"
                  value={editingEntity.newPrice}
                  onChange={data => {
                    editingEntity.newPrice = data;
                  }}
                />
                <InformationItem
                  title="Код тарифа"
                  variant="input"
                  value={editingEntity.code}
                  onChange={data => {
                    editingEntity.code = data;
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
                    editingEntity.description = allText;
                  }}
                  defaultText={editingEntity.description}
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.btnTraffic}>
        <div className={styles.listTariff}>
          <Button onClick={closeDialog}>Список тарифов</Button>
        </div>
        <Button onClick={editTariffs}>{editingEntity?.id ? 'Изменить' : 'Сохранить'}</Button>
      </div>
    </div>
  );
});

export default TariffPage;
