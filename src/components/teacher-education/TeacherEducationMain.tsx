import { useRouter } from 'next/router';
import React from 'react';
import teacherEducationStore from '@app/stores/TeacherEducationStore';
import BlogItem from '@components/molecules/BlogItem';
import styles from './TeacherEducationMain.module.scss';

const TeacherEducationMain = () => {
  const router = useRouter();
  const { tests, setCurrentTest } = teacherEducationStore;
  const onTheoryClick = (id: string) => {
    const test = tests.find((t) => t.id === id);
    //TODO: сделать слаг или айди
    if (test) {
      setCurrentTest(test);
      router.push(`/test/theory/${id}`);
    }
  };

  const onTestClick = (id: string) => {
    const test = tests.find((t) => t.id === id);
    if (test) {
      //сделать слаг или айди
      setCurrentTest(test);
      router.push(`/test/${id}`);
    }
  };
  return (
    <div className={styles.container}>
      {tests.map((item) => {
        return (
          <BlogItem
            key={item.id}
            title={item.title}
            text={item.text}
            imgSrc={item.img}
            // onTestClick={() => onTestClick(item.id)}
            // onTheoryClick={() => onTheoryClick(item.id)}
          />
        );
      })}
    </div>
  );
};

export default TeacherEducationMain;
