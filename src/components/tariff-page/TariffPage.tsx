import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { newStatus } from 'components/rate-choice/RateChoice';
import React, { useState, ChangeEvent, FC, useEffect } from 'react';

import { observer } from 'mobx-react';

import tariffsStore from '../../app/stores/tariffsStore';

import styles from './TariffPage.module.scss';

import Button from 'components/button/Button';
import InformationItem from 'components/information-item/InformationItem';
import TextEditor from 'components/text-editor/TextEditor';

export const month = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
  { value: 9, label: '9' },
  { value: 10, label: '10' },
  { value: 11, label: '11' },
  { value: 12, label: '12' },
];

const TariffPage: FC = observer(() => {
  const { tariff, addOrEdit, closeDialog } = tariffsStore;
  const [startedAt, setStartedAt] = useState<string | null>(tariff.endedAt.date || null);
  const [endedAt, setEndedAt] = useState<string | null>(tariff.startedAt.date || null);
  const [status, setStatus] = useState(tariff.status || 'active');
  const [name, setName] = useState<string>(tariff.name || '');
  const [code, setCode] = useState<string>(tariff.code || '');
  const [oldPrice, setOldPrice] = useState<string>(tariff.oldPrice || '');
  const [newPrice, setNewPrice] = useState<string>(tariff.newPrice || '');
  const [description, setDescriptions] = useState<string>(tariff.description || '');
  const [durationMonths, setDurationMonths] = useState<number>(tariff.durationMonths || 0);
  const [currentRadioValue, setCurrentRadioValue] = useState<string>('twoChildren');

  useEffect(() => {
    if (tariff.forSecondChild) {
      setCurrentRadioValue('twoChildren');
    }
    if (tariff.forFirstPay) {
      setCurrentRadioValue('firstPayment');
    }
    if (tariff.forNewClient) {
      setCurrentRadioValue('registration');
    }
  }, []);

  const handlerRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentRadioValue(e.currentTarget.value);
    if (e.currentTarget.value === 'twoChildren') {
      tariff.forSecondChild = true;
      tariff.forFirstPay = false;
      tariff.forNewClient = false;
    }
    if (e.currentTarget.value === 'registration') {
      tariff.forSecondChild = false;
      tariff.forFirstPay = false;
      tariff.forNewClient = true;
    }
    if (e.currentTarget.value === 'firstPayment') {
      tariff.forSecondChild = false;
      tariff.forFirstPay = true;
      tariff.forNewClient = false;
    }
  };

  const editTariffs = () => {
    if (name.length >= 3 && name.length <= 30) {
      addOrEdit({
        name,
        code,
        status,
        startedAt,
        endedAt,
        description,
        durationMonths,
        oldPrice: null,
        newPrice,
        forFirstPay: tariff.forFirstPay,
        forNewClient: tariff.forNewClient,
        forSecondChild: tariff.forSecondChild,
      });
    } else {
      // eslint-disable-next-line no-alert
      alert('Наименование тарифа должно быть от 3 до 30 символов');
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
                value={name}
                onChange={setName}
                placeholder="имя тарифа"
              />
            </div>
            <div className={styles.infoBlock}>
              <div>
                <InformationItem
                  title="Статус"
                  variant="select"
                  selectValue={newStatus.find((item: any) => item.value === status)}
                  option={newStatus}
                  onChangeSelect={data => {
                    setStatus(data.value);
                  }}
                  placeholder="Активен"
                />
                <div style={{ margin: '25px 0 0 0' }}>
                  <DatePicker
                    value={startedAt}
                    onChange={setStartedAt}
                    toolbarPlaceholder="Дата начала"
                    renderInput={props => (
                      <TextField
                        sx={{ width: '60%' }}
                        {...props}
                        inputProps={{
                          ...props.inputProps,
                          placeholder: 'Дата начала действия',
                        }}
                      />
                    )}
                  />
                </div>
                <div style={{ margin: '25px 0 25px 0' }}>
                  <DatePicker
                    value={endedAt}
                    onChange={setEndedAt}
                    toolbarPlaceholder="Дата окончания"
                    renderInput={props => (
                      <TextField
                        sx={{ width: '60%' }}
                        {...props}
                        inputProps={{
                          ...props.inputProps,
                          placeholder: 'Дата окончания действия',
                        }}
                      />
                    )}
                  />
                </div>
                <div className={styles.tariffAfter}>
                  <label htmlFor="">Тариф после:</label>
                  <InformationItem variant="select" placeholder="Тариф 1" />
                </div>
              </div>
              <div>
                <InformationItem
                  title="Старая цена"
                  variant="numberInput"
                  value={oldPrice}
                  onChange={data => setOldPrice(data)}
                />
                <InformationItem
                  title="Новая цена"
                  variant="numberInput"
                  value={newPrice}
                  onChange={setNewPrice}
                />
                <InformationItem
                  title="Код тарифа"
                  variant="numberInput"
                  value={code}
                  onChange={setCode}
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
                    setDescriptions(allText);
                  }}
                  defaultText={description}
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
                <div className={styles.monthDurations}>
                  <label htmlFor=""> Сколько месяцев действует</label>
                  <InformationItem
                    variant="select"
                    selectValue={month.find((item: any) => item.value === durationMonths)}
                    option={month}
                    size="normal"
                    onChangeSelect={data => {
                      setDurationMonths(data.value);
                    }}
                  />
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
        <Button onClick={editTariffs}>{tariff?.id ? 'Изменить' : 'Сохранить'}</Button>
      </div>
    </div>
  );
});

export default TariffPage;
