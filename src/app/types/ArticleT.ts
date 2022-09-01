import { StatusTypes } from 'app/enums/StatusTypes';
import { Descendant } from 'slate';

export type ArticleT = {
  id: string;
  title: string;
  content: Descendant[];
  test: string;
  status: StatusTypes;
  forStudents: boolean;
  forTeachersEducation: boolean;
  forTeachers: boolean;
  forFranchiseeAdmin: boolean;
  forFranchisee: boolean;
  forTutor: boolean;
  forMethodist: boolean;
};
