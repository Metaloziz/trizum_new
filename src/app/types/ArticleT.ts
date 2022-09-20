import { StatusTypes } from 'app/enums/StatusTypes';
import { Descendant } from 'slate';
import { OneTestBodyT } from 'app/types/TestsT';
import { TimeZoneType } from 'app/types/TimeZoneType';
import { Nullable } from 'app/types/Nullable';

export type ArticleT = {
  id: string;
  title: string;
  content: Descendant[];
  test: Nullable<OneTestBodyT>;
  status: StatusTypes;
  createdAt: TimeZoneType;
  forStudents: boolean;
  forTeachersEducation: boolean;
  forTeachers: boolean;
  forFranchiseeAdmin: boolean;
  forFranchisee: boolean;
  forTutor: boolean;
  forMethodist: boolean;
};
