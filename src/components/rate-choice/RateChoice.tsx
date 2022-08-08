import React, { FC, useState } from 'react';

import { MenuItem, Select } from '@mui/material';
import { observer } from 'mobx-react-lite';

import tariffsStore from '../../app/stores/tariffsStore';

import CustomDatePicker from './customDatePicker';
import styles from './RateChoice.module.scss';

import Button from 'components/button/Button';
import InformationItem from 'components/information-item/InformationItem';

const newStatus = [
  { value: 'all', label: 'Все' },
  { value: 'active', label: 'Активный' },
  { value: 'deleted', label: 'Не активен' },
  { value: 'hidden', label: 'Заблокированный' },
];

type RateChoicePropsType = {
  setCurrentPage: (value: number) => void;
};

const RateChoice: FC<RateChoicePropsType> = observer(({ setCurrentPage }) => {
  const { setFilters } = tariffsStore;
  const [lengthFrom, setLengthFrom] = useState('');
  const [lengthTo, setLengthTo] = useState('');
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [status, setStatus] = useState('all');
  const [input, setInput] = useState('');

  const searchHandler = () => {
    setFilters({ dateFrom, dateTo, status, lengthFrom, lengthTo, input });
    setCurrentPage(1);
  };
  const resetHandler = () => {
    setLengthTo('');
    setLengthFrom('');
    setDateTo(null);
    setDateFrom(null);
    setStatus('all');
    setInput('');
    setFilters({
      dateFrom: '',
      dateTo: '',
      status: 'all',
      lengthFrom: '',
      lengthTo: '',
      input: '',
    });
    setCurrentPage(1);
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
          <label>Статус</label>
          <Select
            onChange={({ target: { value } }) => setStatus(value)}
            label="Статус"
            defaultValue="all"
            size="small"
            value={status}
          >
            {newStatus.map((m, id) => (
              <MenuItem key={`${m}${id}`} value={m.value}>
                {m.label}
              </MenuItem>
            ))}
          </Select>
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
          <Button variant="addExel" onClick={resetHandler}>
            Сбросить
          </Button>
          <Button onClick={searchHandler}>Найти</Button>

          <div className={styles.btnAdd}>
            <Button onClick={() => tariffsStore.openDialog()}>Добавить</Button>
          </div>
        </div>
      </div>
    </div>
  );
});
export default RateChoice;
