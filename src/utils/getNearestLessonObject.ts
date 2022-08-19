import { ScheduleT, ShortScheduleT } from 'app/types/ScheduleT';

export const getNearestLessonObject = (
  schedule: ScheduleT[],
  currentDate: ShortScheduleT,
): ScheduleT => {
  function compareDates(a: ScheduleT, b: ScheduleT) {
    const aDate = a.date.split('.').reverse().join('');
    const bDate = b.date.split('.').reverse().join('');
    if (aDate === bDate) {
      const aTime = a.from.split(':').join('');
      const bTime = b.from.split(':').join('');
      return Number(aTime) - Number(bTime);
    }
    return Number(aDate) - Number(bDate);
  }

  const sortedSchedule = schedule.sort(compareDates); // сортируем уроки по дате и времени
  const nearestLessons = sortedSchedule
    .filter(el => el.date === currentDate.date)
    .find(el => el.from >= currentDate.from); // находим массив уроков, запланированных на текущий день и валидных по времени

  const result2 = sortedSchedule.filter(el => el.date > currentDate.date)[0];

  const result = nearestLessons || result2;

  console.log('getNearestLessonObject', [result]);

  return result;
};
