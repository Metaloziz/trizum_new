/* eslint-disable max-classes-per-file */
import { AxiosResponse } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

import { RequestLogin, RequestSwitchUser, ResponseLoadMe } from '../types/AuthTypes';

import authService from 'app/services/authService';
import { TimeZoneType } from 'app/types/AuthTypes';
import { canSwitchToT } from 'app/types/UserTypes';
import { execute } from 'utils/execute';

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

export class EmptyUser {
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

  isInitialized = false;

  isLoggedIn = false;

  error = '';

  constructor() {
    makeAutoObservable(this);
  }

  setRole = (role: Roles): void => {
    this.role = role;
  };

  login = async (data: RequestLogin) => {
    await execute(async () => {
      await authService.login(data);
    });
  };

  loadme = async () => {
    await execute(async () => {
      const res: AxiosResponse<ResponseLoadMe> = await authService.loadme();
      if (res.status >= 400 || res.data === undefined) {
        runInAction(() => {
          this.isLoggedIn = false;
          this.isInitialized = true;
        });
      }
      if (res.status === 200) {
        runInAction(() => {
          this.isLoggedIn = true;
          this.role = res.data.role as Roles;
          this.user = res.data;
          this.isInitialized = true;
        });
      }
    });
  };

  switchUser = async (params: RequestSwitchUser) => {
    await execute(async () => {
      await authService.switchUser(params);
      await this.loadme();
    });
  };

  setError = (error: string) => {
    this.error = error;
    setTimeout(() => {
      this.error = '';
    }, 5000);
  };
}

export default new AppStore();
