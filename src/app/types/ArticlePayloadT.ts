import { Descendant } from 'slate';

export type ArticlePayloadT = {
  title: string;
  content: Descendant[];
  status?: 'active';
  testId: string;
  forStudents?: boolean;
  forTeachersEducation?: boolean;
  forTeachers?: boolean;
  forFranchiseeAdmin?: boolean;
  forFranchisee?: boolean;
  forTutor?: boolean;
  forMethodist?: boolean;
};
