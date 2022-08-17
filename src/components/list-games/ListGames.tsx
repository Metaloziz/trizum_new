import { FC, useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';

import styles from './ListGames.module.scss';

import gamesStore from 'app/stores/gamesStore';
import image from 'assets/images/table.jpg';
import ItemGame from 'components/list-games/item-games/ItemGame';

const ListGames: FC = observer(() => {
  const { getGames, games } = gamesStore;
  console.log(games);
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
    <>Loading...</>
  ) : (
    <div className={styles.gamesContent}>
      {games.map((item, index) => (
        <ItemGame
          key={item[index].name}
          onClick={() => onClick(item[index].type)}
          title={item[index].name}
          imgSrc={image}
        />
      ))}
    </div>
  );
});

export default ListGames;
