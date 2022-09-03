import { Descendant } from 'slate';
import { StatusT } from 'app/types/StatusT';

export type ArticlePayloadT = {
  title: string;
  content: Descendant[];
  testId: string;
  status?: StatusT;
  forStudents?: boolean;
  forTeachersEducation?: boolean;
  forTeachers?: boolean;
  forFranchiseeAdmin?: boolean;
  forFranchisee?: boolean;
  forTutor?: boolean;
  forMethodist?: boolean;
};
