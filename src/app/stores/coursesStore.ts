import { AnswerT } from '@app/types/CourseTypes';
import { makeAutoObservable } from 'mobx';

class CoursesStore {
  constructor() {
    makeAutoObservable(this);
  }
}
export default new CoursesStore();
