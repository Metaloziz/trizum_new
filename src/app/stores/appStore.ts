/* eslint-disable max-classes-per-file */
import { makeAutoObservable, runInAction } from 'mobx';

import { RequestLogin, RequestSwitchUser } from '../types/AuthTypes';

import authService from 'app/services/authService';
import usersStore from 'app/stores/usersStore';
import { GroupsDataT, PersonalRecordT, ResponseLoadMeParentT } from 'app/types/ResponseLoadMeBaseT';
import { TimeZoneType } from 'app/types/TimeZoneType';
import { canSwitchToT } from 'app/types/UserTypes';
import { execute } from 'utils/execute';
import { AvatarT } from 'app/types/AvatarT';
import { FranchiseT } from 'app/types/FranchiseTypes';
import { LoginPasswordFormType } from 'pages/login/loginWithPassword/LoginWithPassword';
import tokenService from 'app/services/tokenService';

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

  franchise: FranchiseT = {} as FranchiseT;

  city: null | string;

  birthdate: TimeZoneType;

  sex: null | string;

  status;

  avatar: AvatarT;

  groups?: GroupsDataT[];

  canSwitchTo: canSwitchToT[];

  active = false;

  parent: ResponseLoadMeParentT = {} as ResponseLoadMeParentT;

  password: string;

  personalRecord?: PersonalRecordT;

  constructor() {
    this.id = '';
    this.firstName = '';
    this.middleName = '';
    this.lastName = '';
    this.email = '';
    this.phone = '';
    this.role = '';
    this.city = '';
    this.birthdate = {
      date: '',
      timezone_type: 0,
      timezone: '',
    };
    this.password = '';
    this.sex = '';
    this.status = '';
    this.avatar = {
      createdAt: {} as TimeZoneType,
      type: '',
      previewPath: '',
      id: '',
      path: '',
    };
    this.canSwitchTo = [];
    this.parent = {} as ResponseLoadMeParentT;
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

  loginWithSMS = async (data: RequestLogin) => {
    await execute(async () => {
      await authService.loginWithSMS(data);
    });
  };

  loginWithPassword = async (data: LoginPasswordFormType) => {
    await execute(async () => {
      const res = await authService.loginWithPassword(data);
      await tokenService.setUser(res.data.token);
      await this.loadme();
    });
  };

  loadme = async () => {
    await execute(async () => {
      const res = await authService.loadme();
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

  setRole = (role: Roles): void => {
    this.role = role;
    if (role === Roles.Unauthorized) {
      this.user = new EmptyUser();
    }
  };

  setUser = async () => {
    try {
      const res = await authService.loadme();
      runInAction(() => {
        this.role = res.data.role as Roles;
        this.user = res.data;

        if (res.data.role === Roles.Student && !!res.data.groups) {
          const { teacherId } = res.data.groups[0].group;
          usersStore.getOneUser(teacherId);
        }
      });
    } catch (e) {
      console.log(e);
    }
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
