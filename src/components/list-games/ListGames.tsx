import React, { FC, useEffect, useState } from 'react';

import styles from './ListGames.module.scss';

import gamesStore from 'app/stores/gamesStore';
import image from 'assets/images/table.jpg';
import ItemGame from 'components/list-games/item-games/ItemGame';

const ListGames: FC = () => {
  const { getGames, games } = gamesStore;
  const [isLoaded, setIsLoaded] = useState(false);
  const load = async () => {
    await getGames();
    setIsLoaded(true);
  };
  const onClick = (id: string) => {};
  useEffect(() => {
    load();
  }, []);
  return !isLoaded ? (
      <video autoPlay loop muted src={require("../../assets/videos/loader.MP4")}/>
  ) : (
    <div className={styles.gamesContent}>
      {games.map(item => (
        <ItemGame key={item[0]} onClick={() => onClick(item[0])} title="someTitle" imgSrc={image} />
      ))}
    </div>
  );
};

export default ListGames;
