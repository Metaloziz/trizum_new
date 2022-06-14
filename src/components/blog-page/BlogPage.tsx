import { FunctionComponent } from 'react';

import appStore, { Roles } from '@app/stores/appStore';
import Button from '@components/custom-button/CustomButton';
import BlogItem from '@components/molecules/BlogItem';
import { Routes } from '@constants/Routes';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';

import styles from './BlogPage.module.scss';

const items = [
  {
    id: 1,
    img: '/teacher.svg',
    title: 'Блок 1',
    text: 'А также явные признаки победы институционализации призывают нас к новым свершениям, которые, в свою очередь, должны быть обнародованы. Противоположная точка зрения подразумевает, что интерактивные прототипы призывают нас к новым свершениям, которые, в свою очередь, должны быть призваны к ответу. Сложно сказать, почему сторонники тоталитаризма в науке являются только методом политического участия и в равной степени предоставлены сами себе. ',
  },
  {
    id: 2,
    img: '/teacher.svg',
    title: 'Блок 2',
    text: 'А также явные признаки победы институционализации призывают нас к новым свершениям, которые, в свою очередь, должны быть обнародованы. Противоположная точка зрения подразумевает, что интерактивные прототипы призывают нас к новым свершениям, которые, в свою очередь, должны быть призваны к ответу. Сложно сказать, почему сторонники тоталитаризма в науке являются только методом политического участия и в равной степени предоставлены сами себе. ',
  },
  {
    id: 3,
    img: '/teacher.svg',
    title: 'Блок 3',
    text: 'А также явные признаки победы институционализации призывают нас к новым свершениям, которые, в свою очередь, должны быть обнародованы. Противоположная точка зрения подразумевает, что интерактивные прототипы призывают нас к новым свершениям, которые, в свою очередь, должны быть призваны к ответу. Сложно сказать, почему сторонники тоталитаризма в науке являются только методом политического участия и в равной степени предоставлены сами себе. ',
  },
];

const BlogPage: FunctionComponent = observer(() => {
  const { role } = appStore;
  const router = useRouter();
  const onClickAddPost = () => {
    router.push(`${Routes.Blog}/add-post`);
  };
  const onClickAddTest = () => {
    router.push(`${Routes.Blog}/add-test`);
  };
  return (
    <div className={styles.container}>
      {role === Roles.Methodist && (
        <>
          <Button onClick={onClickAddPost}>Добавить статью</Button>
          <Button onClick={onClickAddTest}>Добавить тест</Button>
        </>
      )}
      {items.map(item => (
        <BlogItem
          key={item.id}
          title={item.title}
          text={item.text}
          imgSrc={item.img}
          id={item.id}
        />
      ))}
    </div>
  );
});

export default BlogPage;
