import styles from './Burger.module.scss';

const Burger = () => {
  return (
    <div className={styles.burger} data-auto={'burger'}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Burger;
