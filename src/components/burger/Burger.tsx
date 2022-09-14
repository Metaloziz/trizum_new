import { FC } from 'react'

import styles from './Burger.module.scss';

interface BurgerProps {
  onClick?: () => void
}

const Burger: FC<BurgerProps> = ({onClick}) => (
  <div onClick={onClick} className={styles.burger} data-auto="burger">
    <div />
    <div />
    <div />
  </div>
);

export default Burger;
