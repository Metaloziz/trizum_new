import React, { FC, useState } from 'react';

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
import { Line } from 'react-chartjs-2';
import { SingleValue } from 'react-select';

import styles from './Results.module.scss';

import buttonImage from 'assets/svgs/arrow-onleft-btn.svg';
import FilterItem from 'components/atoms/FilterItem/FilterItem';
import BlueButton from 'components/atoms/GameResultItem/BlueButton';
import UserCard from 'components/atoms/userCard';
import Button from 'components/button/Button';
import Image from 'components/image/Image';
import CalendarResults from 'components/molecules/CalendarResults';
import ResultTable from 'components/molecules/ResultTable';
import SelectResults from 'components/molecules/SelectResults/SelectResults';
import Tablet from 'components/tablet/Tablet';

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

const MONOTONE = 'monotone' as const;

const config = {
  data: {
    labels,
    datasets: [
      {
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
  // { value: 'memoryAndRhythm', label: 'Память и ритм' },
  // { value: 'findWords', label: 'Найди слова' },
  // { value: 'flyInCube', label: 'Мухи в кубе' },
  // { value: 'AntiPuzzle', label: 'Антипазл' },
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
        <button className={styles.buttonArrow}>
          <Image src={buttonImage} alt="arrow" width={26} height={13} />
        </button>
        <span>На предыдущую страницу</span>
      </div>
      <div className={styles.main}>
        <Tablet>
          <div className={styles.blockTop}>
            <div className={styles.user}>
              <UserCard city="Москва" status="Ученик" fullName="Днепровская А.А." />
            </div>
            <div className={styles.filters}>
              <div className={styles.badges}>
                <FilterItem title=" Те, что окрашены в красный цвет" />
                <FilterItem title=" Те, что окрашены в красный цвет" />
                <FilterItem title=" Те, что окрашены в красный цвет" />
              </div>
              <SelectResults
                options={options}
                onChange={onChangeSelect}
                className={styles.filters_select}
              />
            </div>
          </div>
          {view === ResultsView.Table ? (
            <ResultTable />
          ) : (
            <Line className={styles.canvas} {...config} />
          )}
          <div className={styles.buttons}>
            <div className={styles.buttonsView}>
              <BlueButton
                title="Таблица"
                onClick={() => onViewChangeClick(ResultsView.Table)}
                isActive={view === ResultsView.Table}
                type="small"
              />
              {/* <BlueButton */}
              {/*  title="График" */}
              {/*  isActive={view === ResultsView.Chart} */}
              {/*  onClick={() => onViewChangeClick(ResultsView.Chart)} */}
              {/*  type="small" */}
              {/* /> */}
            </div>
            <div className={styles.buttonsColumn}>
              <div className={styles.gamesSelect}>
                <div className={styles.gamesSelect_items}>
                  {gamesAr.map(game => (
                    <BlueButton
                      key={game.value}
                      title={game.label}
                      onClick={() => onGameNameClick(game)}
                      isActive={selectedGames.includes(game)}
                    />
                  ))}
                  <SelectResults
                    // TODO: мультивыбор
                    options={gamesArr}
                    minWidth="150px"
                    onChange={onChangeSelect}
                    className={styles.gamesSelect_select}
                  />
                </div>
                <Button variant="primary" size="thin">
                  Найти
                </Button>
              </div>
              <div className={styles.gamesFields}>
                <CalendarResults value="" onChange={() => console.log('asd')} />
                <CalendarResults value="" onChange={() => console.log('asd')} />
                <SelectResults
                  options={mockSelectData}
                  minWidth="150px"
                  onChange={onChangeSelect}
                  className={styles.gamesSelect_select}
                />
                <SelectResults
                  options={mockSelectData}
                  minWidth="150px"
                  onChange={onChangeSelect}
                  className={styles.gamesSelect_select}
                />
                <SelectResults
                  options={mockSelectData}
                  minWidth="150px"
                  onChange={onChangeSelect}
                  className={styles.gamesSelect_select}
                />
              </div>
            </div>
          </div>
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
