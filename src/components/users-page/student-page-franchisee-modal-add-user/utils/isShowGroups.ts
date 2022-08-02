import { Roles } from 'app/stores/appStore';

export const IsShowGroups = (role: Roles | undefined) =>
  role === Roles.Student || role === Roles.Teacher || role === Roles.TeacherEducation;
