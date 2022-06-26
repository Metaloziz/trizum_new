import { AnswerT } from '@app/types/CourseTypes';
import { makeAutoObservable } from 'mobx';

type NewCourse = {
  title: string;
  level: string;
};

class CoursesStore {
  newCourse?: NewCourse = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setNewCourse = (course: NewCourse) => {
    this.newCourse = course;
  };
}
export default new CoursesStore();
