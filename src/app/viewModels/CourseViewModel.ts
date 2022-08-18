import { HomeworkViewModel } from './HomeworkViewModel';

import { TimeZoneType } from 'app/types/TimeZoneType';

export interface CourseViewModel {
  id?: string;
  title: string;
  level: string;
  works?: HomeworkViewModel[];
  worksCount?: number;
  createdAt: TimeZoneType;
}
