import { ScheduleT } from 'app/types/ScheduleT';

export const dateNow = (): Omit<ScheduleT, 'name' | 'to'> => {
  const todayDate = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' }).toString();

  const result = todayDate.slice(0, 6);
  const result2 = todayDate.slice(8, 10);

  const result3 = todayDate.slice(12, 17);

  return {
    date: result + result2,
    from: result3,
  };
};
