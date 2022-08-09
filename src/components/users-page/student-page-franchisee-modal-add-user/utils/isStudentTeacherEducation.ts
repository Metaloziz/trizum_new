import { Roles } from 'app/stores/appStore';

export const isStudentTeacherEducation = (role: Roles | undefined) =>
  role === Roles.Student || role === Roles.TeacherEducation;
