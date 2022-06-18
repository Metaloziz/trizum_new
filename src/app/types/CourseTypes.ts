export type ResponseCourses = {
  id: string;
  code: string;
};
export type ResponseOneCourse = {
  id: string;
  code: string;
  works: ResponseWork[];
};

export type ResponseWork = {
  id: string;
  code: string;
};
export type RequestCreateCourse = {
  code: string;
};
export type ResponseDeleteCourse = {
  result: string;
};
