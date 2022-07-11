import { makeAutoObservable } from 'mobx';

export enum Roles {
  /* Ученик */
  Student = 'student',
  /* Родитель */
  Parent = 'parent',
  /* Учитель на обучении */
  TeacherEducation = 'teacherEducation',
  /* Учитель */
  Teacher = 'teacher',
  /* Администратор франчайзи */
  FranchiseeAdmin = 'franchiseeAdmin',
  /* Франчайзи */
  Franchisee = 'franchisee',
  /* Методист */
  Methodist = 'methodist',
  /* Куратор */
  Tutor = 'tutor',
  /* Центр */
  Admin = 'admin',
  /* Неавторизованный */
  Unauthorized = 'unauthorized',
}

export const RoleNames = {
  student: 'Ученик',
  parent: 'Родитель',
  teacherEducation: 'Учитель на обучении',
  teacher: 'Учитель',
  franchiseeAdmin: 'Администратор франчайзи',
  franchisee: 'Франчайзи',
  methodist: 'Методист',
  tutor: 'Куратор',
  admin: 'Центр',
};

class AppStore {
  role: Roles = Roles.Unauthorized;

  token = '';

  constructor() {
    makeAutoObservable(this);
  }

  setRole = (role: Roles): void => {
    this.role = role;
  };

  setToken = (token: string) => {
    this.token = token;
  };
}

export default new AppStore();
