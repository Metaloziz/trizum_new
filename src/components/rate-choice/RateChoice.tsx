import React, { FC, useState } from 'react';

import tariffsStore from '../../app/stores/tariffsStore';
import { TariffsType } from '../../app/types/TariffTypes';

import CustomDatePicker from './customDatePicker';
import styles from './RateChoice.module.scss';
import { getDateWithoutTime } from './utils';

import Button from 'components/button/Button';
import InformationItem from 'components/information-item/InformationItem';

const newStatus = [
  { value: 'active', label: 'Активен' },
  { value: 'archive', label: 'Не активен' },
  { value: 'hidden', label: 'Спит' },
];

type Props = {
  filterData: Function;
  data: TariffsType[];
  input: string;
  setInput: (value: string) => void;
  setOutput: (value: TariffsType[]) => void;
  setCurrentPage: (value: number) => void;
};

const RateChoice: FC<Props> = ({
  filterData,
  data,
  input,
  setInput,
  setOutput,
  setCurrentPage,
}) => {
  const [lengthFrom, setLengthFrom] = useState<any>(null);
  const [lengthTo, setLengthTo] = useState<any>(null);
  const [dateFrom, setDateFrom] = useState<any>(null);
  const [dateTo, setDateTo] = useState<any>(null);
  const [status, setStatus] = useState({ value: 'active', label: 'Активен' });

  const searchHundler = () => {
    let newData = data.filter(val => val.name.toLowerCase().includes(input.toLowerCase()));
    if (lengthFrom) {
      newData = newData.filter(val => val.newPrice >= lengthFrom);
    }
    if (lengthTo) {
      newData = newData.filter(val => val.newPrice <= lengthTo);
    }
    if (dateFrom) {
      newData = newData.filter(
        val => getDateWithoutTime(new Date(val.startedAt.date)) >= getDateWithoutTime(dateFrom),
      );
    }
    if (dateTo) {
      newData = newData.filter(
        val => getDateWithoutTime(new Date(val.endedAt.date)) <= getDateWithoutTime(dateTo),
      );
    }
    if (status) {
      newData = newData.filter(val => val.status === status.value);
    }
    setCurrentPage(1);
    setOutput(newData);
  };

  return (
    <div className={styles.rateBlock}>
      <div className={styles.rateName}>
        <div className={styles.rateTariff}>
          <p>Наименование/код тарифа</p>
          <InformationItem
            value={input}
            onChange={setInput}
            className={styles.rateInput}
            variant="input"
          />
        </div>
        <div className={styles.rateStatus}>
          <p>Статус</p>
          <InformationItem
            className={styles.rateSelect}
            variant="select"
            placeholder="Активен"
            option={newStatus}
            onChangeSelect={setStatus}
          />
        </div>
        <div className={styles.ratePrice}>
          <p>Стоимость</p>
          <div className={styles.rateBlockInput}>
            <InformationItem
              onChange={setLengthFrom}
              value={lengthFrom}
              className={styles.rateValue}
              variant="input"
              placeholder="От"
            />
            <InformationItem
              onChange={setLengthTo}
              className={styles.rateValue}
              variant="input"
              placeholder="До"
              value={lengthTo}
            />
          </div>
        </div>
      </div>
      <div className={styles.dataChoice}>
        <div className={styles.dataEnd}>
          <div>
            <CustomDatePicker
              value={dateFrom}
              setValue={setDateFrom}
              label="Дата начала действия"
            />
          </div>
          <div>
            <CustomDatePicker value={dateTo} setValue={setDateTo} label="Дата окончания действия" />
          </div>
        </div>
        <div className={styles.btnBlock}>
          <Button onClick={searchHundler}>Найти</Button>
          <div className={styles.btnAdd}>
            <Button onClick={() => tariffsStore.openDialog()}>Добавить</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RateChoice;
