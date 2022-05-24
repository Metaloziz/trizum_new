import React, { FC } from 'react'
import Results from '@components/results/Results'
import styles from '@pages/results/Results.module.scss'

type Props = {

}

const IndexPage:FC<Props> = () => {
  return (
    <div className={styles.container}>
      <Results/>
    </div>
  )
}

export default IndexPage
