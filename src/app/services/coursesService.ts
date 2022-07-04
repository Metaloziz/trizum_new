import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import {
  RequestCreateCourse,
  RequestEditCourse,
  ResponseCourse,
  ResponseDeleteCourse,
  ResponseOneCourse,
  ResponseOneFullCourse,
  ResponseWork,
} from 'app/types/CourseTypes';

const coursesService = {
  getAllCourses: async (): Promise<ResponseCourse[]> => {
    const { data } = await instance.get(Paths.Courses);
    return data;
  },
  getOneCourse: async (id: string): Promise<ResponseOneFullCourse> => {
    const { data } = await instance.get(`${Paths.Courses}/${id}`);
    return data;
  },
  createCourse: async (options: RequestCreateCourse): Promise<ResponseCourse> => {
    const { data } = await instance.post(Paths.Courses, options);
    return data;
  },
  editCourse: async (options: RequestEditCourse, id: string): Promise<ResponseOneFullCourse> => {
    const { data } = await instance.post(`${Paths.Courses}/${id}`, options);
    return data;
  },
  deleteCourse: async (id: string): Promise<ResponseDeleteCourse> => {
    const { data } = await instance.delete(`${Paths.Courses}/${id}`);
    return data;
  },
  getAllWorks: async (): Promise<ResponseWork[]> => {
    const { data } = await instance.get(Paths.Works);
    return data;
  },
  getOneWork: async (id: string): Promise<any> => {
    const { data } = await instance.get(`${Paths.Works}/${id}`);
    return data;
  },
};

export default coursesService;
