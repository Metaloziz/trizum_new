export const getRuBirthdayDate = (date: string): string =>
  date.slice(0, 10).split('-').reverse().join('.') + ' г.';
