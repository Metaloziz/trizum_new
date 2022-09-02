import { StatusTypes } from 'app/enums/StatusTypes';
import { Descendant } from 'slate';
import { OneTestBodyT } from 'app/types/TestsT';

export type ArticleT = {
  id: string;
  title: string;
  content: Descendant[];
  test: OneTestBodyT;
  status: StatusTypes;
  forStudents: boolean;
  forTeachersEducation: boolean;
  forTeachers: boolean;
  forFranchiseeAdmin: boolean;
  forFranchisee: boolean;
  forTutor: boolean;
  forMethodist: boolean;
};
