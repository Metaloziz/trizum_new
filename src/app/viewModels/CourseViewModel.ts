import { HomeworkViewModel } from './HomeworkViewModel';

import { TimeZoneType } from 'app/types/TimeZoneType';

export interface CourseViewModel {
  id?: string;
  title: string;
  description?: string;
  // level: 'easy' | 'medium' | 'hard';
  level: string;
  type: string;
  status: string;
  works?: HomeworkViewModel[];
  worksCount?: number;
  createdAt?: TimeZoneType;
}
export type CourseViewModelAddEdit = Omit<CourseViewModel, 'works' | 'status'> & {
  works?: { index: number; workId: string }[];
  status?: string;
};
