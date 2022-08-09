import { StatusTypes } from 'app/enums/StatusTypes';

export type ArticleT = {
  id: string;
  title: string;
  content: [
    {
      text: string;
    },
  ];
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
