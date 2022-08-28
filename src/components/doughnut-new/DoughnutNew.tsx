import { FC } from 'react';

import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
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
  SubTitle,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import styles from './DoughnutNew.module.scss';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ChartDataLabels);
Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
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
  SubTitle,
);

const getTotal = (text: any) => {
  const result = text.config.data.dataset[0].data.reduce((a: any, b: any) => a + b, 0);
  return `${result}% \n + Правильных ответов`;
};
const config = {
  data: {
    datasets: [
      {
        label: 'Sales',
        data: [24, 76],
        backgroundColor: ['#D2D2D2', '#4FC1D6'],
        borderColor: ['#D2D2D2', '#4FC1D6'],
        display: true,
      },
    ],
  },
  options: {
    font: {
      size: 14,
      weight: '700',
    },
    responsive: true,
    cutout: '93%',
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        color: 'red',
      },
      doughnutlabel: {
        labels: [
          {
            text: getTotal,
            font: {
              size: 67,
            },
            color: 'black',
          },
          {
            text: 'Due ≤ 60 Days',
            font: {
              size: 25,
            },
            color: 'grey',
          },
        ],
      },
      ChartDataLabels,
    },
  },
};

const DoughnutNew: FC = () => (
  <div className={styles.canvasBlock}>
    <Doughnut {...config}>
      <p style={{ position: 'relative', left: '194px' }}>Правильных ответов</p>
    </Doughnut>
  </div>
);

export default DoughnutNew;
