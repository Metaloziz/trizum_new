import coursesService, { MockType } from '@app/services/coursesService';
import { AnswerT, RequestCreateCourse, ResponseCourse } from '@app/types/CourseTypes';
import { makeAutoObservable, runInAction } from 'mobx';

type NewCourse = {
  title: string;
  level: string;
};

class CoursesStore {

  courses: ResponseCourse[] = [];

  homeworks: MockType[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getCourses = async () => {
    const res = await coursesService.getAllCourses();
    runInAction(() => {
      this.courses = res.reverse();
    });
  };

  createCourse = async (data: RequestCreateCourse) => {
    try {
      await coursesService.createCourse(data);
      await this.getCourses();
    } catch (e) {
      console.warn(e);
    }
  };

  editCourse = async (data: RequestCreateCourse) => {
    try {
      await coursesService.createCourse(data);
      await this.getCourses();
    } catch (e) {
      console.warn(e);
    }
  };

  getHomeworks = async () => {
    const res = await coursesService.getAllWorks();
    runInAction(() => {
      this.homeworks = res;
    });
  };
  // setNewCourse = (course: NewCourse) => {
  //   this.newCourse = course;
  // };
}
export default new CoursesStore();
