import { FC } from 'react';

import ItemGames from '@components/list-games/item-games/ItemGames';
import { Routes } from '@constants/Routes';
import { useRouter } from 'next/router';

import styles from './ListGames.module.scss';

const items = [
  {
    id: 1,
    title: 'Таблица шульте',
    img: '/table.jpg',
  },
  {
    id: 2,
    title: 'Найди слова/ числа/ фигуры',
    img: '/words.jpg',
  },
  {
    id: 3,
    title: 'Таблица шульте',
    img: '/table.jpg',
  },
  {
    id: 4,
    title: 'Найди слова/ числа/ фигуры',
    img: '/words.jpg',
  },
  {
    id: 5,
    title: 'Таблица шульте',
    img: '/table.jpg',
  },
  {
    id: 6,
    title: 'Найди слова/ числа/ фигуры',
    img: '/words.jpg',
  },
  {
    id: 7,
    title: 'Таблица шульте',
    img: '/table.jpg',
  },
  {
    id: 8,
    title: 'Найди слова/ числа/ фигуры',
    img: '/words.jpg',
  },
];

const ListGames: FC = () => {
  const router = useRouter();
  const onClick = (id: number) => {
    router.push(`${Routes.Games}/play/${id}`);
  };
  return (
    <div className={styles.gamesContent}>
      {items.map(item => (
        <ItemGames
          key={item.id}
          onClick={() => onClick(item.id)}
          title={item.title}
          imgSrc={item.img}
        />
      ))}
    </div>
  );
};

export default ListGames;
