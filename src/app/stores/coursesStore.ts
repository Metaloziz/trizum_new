import { makeAutoObservable, runInAction } from 'mobx';

import coursesService from 'app/services/coursesService';
import {
  GetCoursesParams,
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
  courses: ResponseCourse[] = [
    {
      id: '',
      title: '',
      level: '',
      works: [],
      createdAt: { date: '', timezone: '', timezone_type: 0 },
      worksCount: 0,
    },
  ];

  currentCourse?: ResponseOneFullCourse = undefined;

  homeworks: ResponseWork[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentCourse = (course?: ResponseOneFullCourse) => {
    this.currentCourse = course;
  };

  getCourses = async (params?: GetCoursesParams) => {
    const res = await coursesService.getAllCourses(params);
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
