import React, { FC } from 'react'
import styles from './RecognitionResults.module.scss'
import Image from 'next/image'
import buttonImage from '@svgs/arrow-onleft-btn.svg'
import { Line } from 'react-chartjs-2'
import {
  Chart,
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
  Tooltip, ScriptableContext, ScriptableScaleContext,
} from 'chart.js'
import { AnyObject } from 'chart.js/types/basic'
import Tablet from '@components/tablet/Tablet'


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
)
type Props = {}

const labels = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
]
const Utils = {
  CHART_COLORS: {
    blue: '#4c8f9b',
    yellow: '#ecd7aa',
    red: '#ea7979',
  },
}
let width: any, height: any, gradient: any

function getGradient(ctx: any, chartArea: any) {
  const chartWidth = chartArea.right - chartArea.left
  const chartHeight = chartArea.bottom - chartArea.top
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth
    height = chartHeight
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
    gradient.addColorStop(0, Utils.CHART_COLORS.blue)
    gradient.addColorStop(0.5, Utils.CHART_COLORS.yellow)
    gradient.addColorStop(1, Utils.CHART_COLORS.red)
  }

  return gradient
}

const MONOTONE = 'monotone' as const

const config = {
  data: {
    labels: labels,
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'red',
        borderWidth: 2,
        pointRadius: 0,
        borderColor: function (context: any) {
          const chart = context.chart
          const {ctx, chartArea} = chart

          if (!chartArea) {
            // This case happens on initial chart load
            return
          }
          return getGradient(ctx, chartArea)
        },
        data: [ 0, 80, 5, 2, 20, 70, 45, 65, 5, 2, 20, 70, 45, 65 ],
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
          color: function (context: ScriptableScaleContext,options: AnyObject) {
            return '#fff'
          },
        },
        ticks: {
          callback: (e:number | string) => {
            if (typeof e === 'number' && e % 2) {
              return ''
            }
            return e
          },
          color: '#BABEC6',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          borderDash: [ 2, 2 ],
        },
        ticks: {
          display: false,
          callback: (e:number | string) => {
            if (typeof e === 'number' && e % 2) {
              return e
            }
            return ''
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
}

const RecognitionResults: FC<Props> = () => {
  return (
    <div className={ styles.container }>
      <div className={ styles.back }>
        <button className={ styles.buttonArrow }>
          <Image src={ buttonImage } alt={ 'arrow' } width={ 26 } height={ 13 }/>
        </button>
        <span>На предыдущую страницу</span>
      </div>
      <div className={ styles.main }>
        {/*<div className={ styles.charts }>*/}
          {/*<div className={ styles.screen }>*/}
            <Tablet>
              <div className={styles.blockTop}>
                photo
              </div>
            <Line
              className={ styles.canvas }
              {...config}
            />
            </Tablet>
          {/*</div>*/}
        {/*</div>*/}
        <div className={ styles.description }>
          <h4>Скорость распознавания образов</h4>
          <p className={ styles.text }>На экране будут появляться группы шариков с разными цветами, буквами и символами.
            Те, что окрашены в красный цвет - можно уничтожать, все остальные нельзя.</p>
        </div>
      </div>
    </div>
  )
}

export default RecognitionResults
