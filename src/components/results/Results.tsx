import React, { FC, useState } from 'react';

import FilterItem from '@components/atoms/FilterItem/FilterItem';
import BlueButton from '@components/atoms/GameResultItem/BlueButton';
import UserCard from '@components/atoms/userCard';
import BackButton from '@components/backButton/BackButton';
import CustomButton from '@components/custom-button/CustomButton';
import CalendarResults from '@components/molecules/CalendarResults';
import ResultTable from '@components/molecules/ResultTable';
import SelectResults from '@components/molecules/SelectResults/SelectResults';
import Tablet from '@components/tablet/Tablet';
import buttonImage from '@svgs/arrow-onleft-btn.svg';
import {
  ArcElement,
  CategoryScale,
  Chart,
  Decimation,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  LogarithmicScale,
  PointElement,
  RadarController,
  RadialLinearScale,
  ScriptableScaleContext,
  TimeScale,
  TimeSeriesScale,
  Title,
  Tooltip,
} from 'chart.js';
import { AnyObject } from 'chart.js/types/basic';
import Image from 'next/image';
import { Line } from 'react-chartjs-2';
import { SingleValue } from 'react-select';

import styles from './Results.module.scss';

Chart.register(
  ArcElement,
  LineElement,
  PointElement,
  LineController,
  RadarController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
);
type Props = {};

const labels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const Utils = {
  CHART_COLORS: {
    blue: '#4c8f9b',
    yellow: '#ecd7aa',
    red: '#ea7979',
    lait: '#b09fff',
    violet: '#8d79f6',
  },
};
let width: any;
let height: any;
let gradient: any;

function getGradient(ctx: any, chartArea: any) {
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, Utils.CHART_COLORS.blue);
    gradient.addColorStop(0.5, Utils.CHART_COLORS.yellow);
    gradient.addColorStop(1, Utils.CHART_COLORS.red);
  }
  
  return gradient;
}

function getGradientTwo(ctx2: any, chartArea2: any) {
  const chartWidth = chartArea2.right - chartArea2.left;
  const chartHeight = chartArea2.bottom - chartArea2.top;
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth;
    height = chartHeight;
    gradient = ctx2.createLinearGradient(0, chartArea2.bottom, 0, chartArea2.top);
    gradient.addColorStop(0, Utils.CHART_COLORS.blue);
    gradient.addColorStop(0.5, Utils.CHART_COLORS.lait);
    gradient.addColorStop(1, Utils.CHART_COLORS.violet);
  }
  
  return gradient;
}

const MONOTONE = 'monotone' as const;

const config = {
  data: {
    labels,
    datasets: [
      {
        type: 'line',
        label: 'My First dataset',
        backgroundColor: 'red',
        borderWidth: 2,
        pointRadius: 0,
        borderColor(context: any) {
          const { chart } = context;
          const { ctx, chartArea } = chart;
          
          if (!chartArea) {
            // This case happens on initial chart load
            return;
          }
          // eslint-disable-next-line consistent-return
          return getGradient(ctx, chartArea);
        },
        data: [0, 80, 5, 2, 20, 70, 45, 65, 5, 2, 20, 70, 45, 65],
        cubicInterpolationMode: MONOTONE,
      },
      {
        type: 'line',
        label: 'My Second dataset',
        backgroundColor: 'blue',
        borderWidth: 2,
        pointRadius: 0,
        borderColor(context: any) {
          const { chart } = context;
          const { ctx2, chartArea2 } = chart;
          
          if (!chartArea2) {
            // This case happens on initial chart load
            return;
          }
          // eslint-disable-next-line consistent-return
          return getGradientTwo(ctx2, chartArea2);
        },
        data: [10, 20, 30, 40, 50, 60, 77, 58, 85, 20, 43, 63, 15, 31],
        cubicInterpolationMode: MONOTONE,
      },
    ],
  },
  options: {
    font: {
      family: 'Montserrat',
      size: 9,
      weight: '400',
    },
    scales: {
      x: {
        grid: {
          color(context: ScriptableScaleContext, options: AnyObject) {
            return '#fff';
          },
        },
        ticks: {
          callback: (e: number | string) => {
            if (typeof e === 'number' && e % 2) {
              return '';
            }
            return e;
          },
          color: '#BABEC6',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          borderDash: [2, 2],
        },
        ticks: {
          display: false,
          callback: (e: number | string) => {
            if (typeof e === 'number' && e % 2) {
              return e;
            }
            return '';
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    backgroundColor: '',
  },
};

const options = [
  { value: '1', label: 'First' },
  { value: '2', label: 'Second' },
  { value: '3', label: 'Third' },
];
export type ValueLabelT = {
  value: string;
  label: string;
};
const gamesAr: ValueLabelT[] = [
  { value: 'total', label: 'Общий балл' },
  { value: 'memoryAndRhythm', label: 'Память и ритм' },
  { value: 'findWords', label: 'Найди слова' },
  { value: 'flyInCube', label: 'Мухи в кубе' },
  { value: 'AntiPuzzle', label: 'Антипазл' },
  { value: 'memory', label: 'Память' },
  { value: 'attention', label: 'Внимание' },
];

enum ResultsView {
  Table = 0,
  // Chart = 1,
}

const gamesArr = [
  { value: 'memoryAndRhythm', label: 'Память и ритм' },
  { value: 'findWords', label: 'Найди слова' },
  { value: 'flyInCube', label: 'Мухи в кубе' },
  { value: 'AntiPuzzle', label: 'Антипазл' },
];
const Results: FC<Props> = () => {
  const [selectedGames, setSelectedGames] = useState<ValueLabelT[]>([]);
  const [view, setView] = useState(ResultsView.Table);
  const [selectValue, setSelectValue] = useState<SingleValue<ValueLabelT>>();
  const mockSelectData: ValueLabelT[] = [{ value: 'value', label: 'label' }];
  const onGameNameClick = (selectedGame: ValueLabelT) => {
    if (selectedGame.value === 'total' && !selectedGames.includes(selectedGame)) {
      setSelectedGames([selectedGame]);
      return;
    }
    if (selectedGame.value !== 'total' && selectedGames.find(el => el.value === 'total')) {
      const newGames = selectedGames.filter(game => game.value !== 'total');
      setSelectedGames([...newGames, selectedGame]);
      return;
    }
    if (selectedGames.includes(selectedGame)) {
      setSelectedGames(selectedGames.filter(elem => elem.value !== selectedGame.value));
    } else {
      setSelectedGames([...selectedGames, selectedGame]);
    }
  };

  const onChangeSelect = (value: SingleValue<ValueLabelT>) => {
    setSelectValue(value);
  };
  const onViewChangeClick = (value: ResultsView) => {
    if (view === value) {
      // true
    } else {
      setView(value);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.back}>
        <BackButton />
      </div>
      <div className={styles.main}>
        <Tablet>
          <div className={styles.blockTop}>
            <div className={styles.user}>
              <div className={styles.userBlock}>
                <UserCard city='Москва' status='Ученик' fullName='Днепровская А.А.' />
              </div>
              <div className={styles.buttonsView}>
                <BlueButton
                  title='Таблица'
                  onClick={() => onViewChangeClick(ResultsView.Table)}
                  isActive={view === ResultsView.Table}
                  type='small'
                />
                <BlueButton
                  title='График'
                  isActive={view === ResultsView.Chart}
                  onClick={() => onViewChangeClick(ResultsView.Chart)}
                  type='small'
                />
              </div>
            </div>
            <div className={styles.filterBlock}>
              <div className={styles.blockBtn}>
                {gamesAr.map(game => (
                  <BlueButton
                    key={game.value}
                    title={game.label}
                    onClick={() => onGameNameClick(game)}
                    isActive={selectedGames.includes(game)}
                  />
                ))}
              </div>
              <div className={styles.gamesFields}>
                <CalendarResults
                  value=''
                  onChange={() => console.log('asd')}
                  placeholder='Начало периода'
                />
                <CalendarResults
                  value=''
                  onChange={() => console.log('asd')}
                  placeholder='Конец периода'
                />
                <SelectResults
                  options={mockSelectData}
                  minWidth='150px'
                  onChange={onChangeSelect}
                  className={styles.gamesSelect_select}
                  placeholder='ФИО ученика'
                />
                <SelectResults
                  options={mockSelectData}
                  minWidth='150px'
                  onChange={onChangeSelect}
                  className={styles.gamesSelect_select}
                  placeholder='Группа'
                />
              </div>
              <div className={styles.filters}>
                <div className={styles.badges}>
                  <FilterItem title=' Те, что окрашены в красный цвет' />
                  <FilterItem title=' Те, что окрашены в красный цвет' />
                  <FilterItem title=' Те, что окрашены в красный цвет' />
                </div>
                <SelectResults
                  options={options}
                  onChange={onChangeSelect}
                  className={styles.filters_select}
                  placeholder='Последний положительно пройденный уровень'
                />
              </div>
              <div className={styles.findBtn}>
                <CustomButton type='primary' size='thin'>
                  Найти
                </CustomButton>
              </div>
            </div>
          </div>
          {view === ResultsView.Table ? (
            <ResultTable />
          ) : (
            <Line className={styles.canvas} {...config} />
          )}
        </Tablet>
        {/* <div className={styles.description}> */}
        {/*  <h4>Скорость распознавания образов</h4> */}
        {/*  <p className={styles.text}> */}
        {/*    На экране будут появляться группы шариков с разными цветами, буквами */}
        {/*    и символами. Те, что окрашены в красный цвет - можно уничтожать, все */}
        {/*    остальные нельзя. */}
        {/*  </p> */}
        {/* </div> */}
      </div>
    </div>
  );
};
export default Results;
