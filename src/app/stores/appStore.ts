/* eslint-disable max-classes-per-file */
import { makeAutoObservable, runInAction } from 'mobx';

import { RequestSwitchUser } from '../types/AuthTypes';

import authService from 'app/services/authService';
import usersStore from 'app/stores/usersStore';
import { ResponseLoadMeBaseT } from 'app/types/ResponseLoadMeBaseT';
import { TimeZoneType } from 'app/types/TimeZoneType';
import { canSwitchToT } from 'app/types/UserTypes';
import { defaultUser } from 'constants/defaultUser';

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

  user: ResponseLoadMeBaseT = defaultUser;

  constructor() {
    makeAutoObservable(this);
  }

  setRole = (role: Roles): void => {
    this.role = role;
  };

  setUser = async () => {
    try {
      const res: ResponseLoadMeBaseT = await authService.loadme();
      console.log(res);
      runInAction(() => {
        this.role = res.role as Roles;
        this.user = res;

        if (res.role === Roles.Student && !!res.groups) {
          const { teacherId } = res.groups[0].group;
          usersStore.getOneUser(teacherId);
        }
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
