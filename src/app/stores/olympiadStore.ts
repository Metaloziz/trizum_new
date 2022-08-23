import { makeAutoObservable } from 'mobx';
import { ResponseOneFullCourse, ResponseWork } from 'app/types/CourseTypes';
import coursesStore from 'app/stores/coursesStore';
import { GroupTypes } from 'app/enums/GroupTypes';

type NewCourse = {
  title: string;
  level: string;
};

class OlympiadStore {
  // franchise: FranchisingViewModel[];

  currentCourse?: ResponseOneFullCourse = undefined;

  homeworks: ResponseWork[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getCoursesFromCurrentFranchise() {
    const { getCourses } = coursesStore;

    getCourses({ type: 'olympiad' });
  }
}
export default new OlympiadStore();
