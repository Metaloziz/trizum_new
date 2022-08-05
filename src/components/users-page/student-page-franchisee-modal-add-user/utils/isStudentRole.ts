import { Roles } from 'app/stores/appStore';

export const isStudentRole = (selectedRole: Roles | undefined) => selectedRole === Roles.Student;
