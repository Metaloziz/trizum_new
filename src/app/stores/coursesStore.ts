import { makeAutoObservable, runInAction } from 'mobx';

import coursesService from 'app/services/coursesService';
import {
  RequestCreateCourse,
  RequestEditCourse,
  ResponseCourse,
  ResponseOneFullCourse,
  ResponseWork,
} from 'app/types/CourseTypes';

type NewCourse = {
  title: string;
  level: string;
};

class CoursesStore {
  courses: ResponseCourse[] = [];

  currentCourse?: ResponseOneFullCourse = undefined;

  homeworks: ResponseWork[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentCourse = (course?: ResponseOneFullCourse) => {
    this.currentCourse = course;
  };

  getCourses = async () => {
    const res = await coursesService.getAllCourses();
    runInAction(() => {
      this.courses = res.items;
    });
  };

  getOneCourse = async (id: string) => {
    try {
      const res = await coursesService.getOneCourse(id);
      this.setCurrentCourse(res);
    } catch (e) {
      console.warn(e);
    }
  };

  createCourse = async (data: RequestCreateCourse) => {
    try {
      await coursesService.createCourse(data);
      await this.getCourses();
    } catch (e) {
      console.warn(e);
    }
  };

  editCourse = async (data: RequestEditCourse, id: string) => {
    try {
      const res = await coursesService.editCourse(data, id);
      this.setCurrentCourse(res);
    } catch (e) {
      console.warn(e);
    }
  };

  getHomeworks = async () => {
    const res = await coursesService.getAllWorks();
    runInAction(() => {
      this.homeworks = res.reverse();
    });
  };
}
export default new CoursesStore();
