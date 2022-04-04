import React from 'react';
import style from './StudentInfoTable.module.scss';

const data = [
  { title: 'Статус', description: 'Ученик' },
  { title: 'Город', description: 'Москва' },
  { title: 'Телефон', description: '+7(950)55 33 570' },
  { title: 'Дата рождения', description: '03.09.1993 г.' },
  { title: 'Почта', description: 'sanya@yandex.ru' },
];

const StudentInfoTable = () => {
  return (
    <>
      {data.map((item) => (
        <ul key={item.title} className={style.list}>
          <li>{item.title}:</li>
          <li>{item.description}</li>
        </ul>
      ))}
    </>
  );
};

export default StudentInfoTable;
