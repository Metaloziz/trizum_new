export type ScheduleT = {
  name: string;
  date: string;
  from: string;
  to: string;
};

export type ShortScheduleT = Pick<ScheduleT, 'date' | 'from'>;
