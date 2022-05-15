import React, { FC } from 'react'
import styles from './RecognitionResults.module.scss'
import Image from 'next/image'
import buttonImage from '@svgs/arrow-onleft-btn.svg'

type Props = {}

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
        <div className={ styles.charts }>
          <div className={ styles.screen }>
            c
          </div>
        </div>
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
