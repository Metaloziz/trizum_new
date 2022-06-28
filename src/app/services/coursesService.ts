import { Paths } from '@app/enums/Paths';
import instance from '@app/services/config';
import {
  RequestCreateCourse,
  ResponseCourse,
  ResponseDeleteCourse,
  ResponseOneCourse,
} from '@app/types/CourseTypes';

export type MockType = {
  id: string;
  code: string;
};

const coursesService = {
  getAllCourses: async (): Promise<ResponseCourse[]> => {
    const { data } = await instance.get(Paths.Courses);
    return data;
  },
  getOneCourse: async (id: string): Promise<ResponseOneCourse> => {
    const { data } = await instance.get(`${Paths.Courses}/${id}`);
    return data;
  },
  createCourse: async (options: RequestCreateCourse): Promise<ResponseCourse> => {
    const { data } = await instance.post(Paths.Courses, options);
    return data;
  },
  editCourse: async (options: ResponseOneCourse): Promise<ResponseOneCourse> => {
    const { data } = await instance.post(Paths.Courses, options);
    return data;
  },
  deleteCourse: async (id: string): Promise<ResponseDeleteCourse> => {
    const { data } = await instance.delete(`${Paths.Courses}/${id}`);
    return data;
  },
  getAllWorks: async (): Promise<MockType[]> => {
    const { data } = await instance.get(Paths.Works);
    return data;
  },
  getOneWork: async (id: string): Promise<any> => {
    const { data } = await instance.get(`${Paths.Courses}/${id}`);
    return data;
  },
  createWork: async (options: any): Promise<any> => {
    const { data } = await instance.post(Paths.Courses, options);
    return data;
  },
  deleteWork: async (id: string): Promise<any> => {
    const { data } = await instance.delete(`${Paths.Courses}/${id}`);
    return data;
  },
};

export default coursesService;
