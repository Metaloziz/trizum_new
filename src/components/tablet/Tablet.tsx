import React, { FC } from 'react'
import styles from './Tablet.module.scss'
import ButtonPlay from '@components/button-play/ButtonPlay'
type TabletProps = {

}
const Tablet:FC<TabletProps> = (props) => {
  const {children} = props
    return (
    <div className={styles.container}>
      <div className={styles.blockShulte}>
        {children}
        <div className={styles.tableBtn}>
          <div></div>
          <div></div>
        </div>
        <div className={styles.leftBtn}></div>
      </div>
    </div>

  )
}

export default Tablet
