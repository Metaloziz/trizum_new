/* eslint-disable max-classes-per-file */
import { makeAutoObservable, runInAction } from 'mobx';

import { RequestSwitchUser, ResponseLoadMe } from '../types/AuthTypes';

import authService from 'app/services/authService';
import { TimeZoneType } from 'app/types/AuthTypes';
import { canSwitchToT } from 'app/types/UserTypes';

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

class EmptyUser {
  id;

  firstName;

  middleName: null | string;

  lastName;

  email;

  phone;

  role;

  franchise: null | string;

  city: null | string;

  birthdate: TimeZoneType;

  sex: null | string;

  status;

  avatar: { id: string; path: string };

  canSwitchTo: canSwitchToT[];

  constructor() {
    this.id = '';
    this.firstName = '';
    this.middleName = '';
    this.lastName = '';
    this.email = '';
    this.phone = '';
    this.role = '';
    this.franchise = '';
    this.city = '';
    this.birthdate = {
      date: '',
      timezone_type: 0,
      timezone: '',
    };
    this.sex = '';
    this.status = '';
    this.avatar = {
      id: '',
      path: '',
    };
    this.canSwitchTo = [];
  }
}

class AppStore {
  role: Roles = Roles.Unauthorized;

  user = new EmptyUser();

  constructor() {
    makeAutoObservable(this);
  }

  setRole = (role: Roles): void => {
    this.role = role;
  };

  setUser = async () => {
    try {
      const res: ResponseLoadMe = await authService.loadme();
      console.log(res);
      runInAction(() => {
        this.role = res.role as Roles;
        this.user = res;
      });
    } catch (e) {
      console.log(e);
    }
  };

  switchUser = async (params: RequestSwitchUser) => {
    try {
      const res = await authService.switchUser(params);
      await this.setUser();
    } catch (e) {
      console.warn(e);
    }
  };
}

export default new AppStore();
