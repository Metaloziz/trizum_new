import styles from './teacherMain.module.scss';
import {FC} from "react";
import TeacherSearchBar from "@components/teacher-searchBar/TeacherSearchBar";
import ScheduleDnD from "@components/schedule/ScheduleDnD";
import Schedule from "@components/schedule/Schedule";

const groups = ['group №1', 'group №2', 'group №3'];
const schools = ['school №1', 'school №2', 'school №3'];
const cities = ['city №1', 'city №2', 'city №3'];

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

const TeacherMain: FC = () => {
  return (
    <div className={styles.container}>
      {/*<TeacherSearchBar cities={cities} groups={groups} schools={schools} />*/}
      <Schedule />
      {/*<ScheduleDnD />*/}
      {/* {items.map((item) => {
        return (
          <TeacherMainItem
            key={item.id}
            title={item.title}
            text={item.text}
            imgSrc={item.img}
          />
        );
      })}*/}
    </div>
  );
};
export default TeacherMain
