export const getFullYearsFromDate = (date: string): number => {
  const now = new Date().getTime();

  const past = new Date(date);

  const result = Number(now) - Number(past);

  const millisecondInYear = 365 * 24 * 60 * 60 * 1000;

  return Math.trunc(result / millisecondInYear);
};
