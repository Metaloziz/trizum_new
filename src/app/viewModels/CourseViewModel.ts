import { HomeworkViewModel } from './HomeworkViewModel';

import { TimeZoneType } from 'app/types/TimeZoneType';

export interface CourseViewModel {
  id?: string;
  title: string;
  // level: 'easy' | 'medium' | 'hard';
  level: string;
  type: string;
  status: string;
  works?: HomeworkViewModel[];
  worksCount?: number;
  createdAt?: TimeZoneType;
}
