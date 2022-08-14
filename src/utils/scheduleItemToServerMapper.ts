import moment from 'moment';

import { DateTime } from 'app/enums/DateTime';
import { LessonStringValuesT, LessonT } from 'app/types/GroupTypes';

export const scheduleItemToServerMapper = (elem: LessonT): LessonStringValuesT => ({
  date: moment(elem.date).format(DateTime.DdMmYyyy),
  from: moment(elem.from).format(DateTime.WithTime).split(' ')[1],
  name: elem.name,
  to: moment(elem.to).format(DateTime.WithTime).split(' ')[1],
});

export const scheduleItemToUIMapper = (elem: LessonStringValuesT): LessonT => {
  const d = elem.date
    .split('.')
    .reverse()
    .map(el => Number(el));
  const from = elem.from.split(':').map(el => Number(el));
  const to = elem.to.split(':').map(el => Number(el));
  return {
    date: new Date(d[0], d[1] -1, d[2]),
    name: elem.name,
    id: (Math.random() * 1000).toString(),
    from: new Date(2022, 0, 1, from[0], from[1]),
    to: new Date(2022, 0, 1, to[0], to[1]),
  };
};
