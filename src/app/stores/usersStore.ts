import { makeAutoObservable, runInAction } from 'mobx';

import authService from 'app/services/authService';
import usersService from 'app/services/usersService';
import { RequestRegister } from 'app/types/AuthTypes';
import { UpdateUserPayloadT } from 'app/types/UpdateUserPayloadT';
import {
  RequestParenting,
  RequestUsersForFilter,
  RequestUsersParams,
  ResponseOneUser,
  ResponseUserT,
} from 'app/types/UserTypes';
import { checkErrorMessage, ErrorMessageType } from 'utils/checkErrorMessage';
import { SearchUserType } from 'app/types/SearchUserType';

class UsersStore {
  users: ResponseUserT[] = [];

  usersTotalCount = 1;

  page = 1;

  perPage = 5;

  currentUser?: ResponseOneUser;
 
  firstName?:SearchUserType ;

  middleName :SearchUserType ;

  lastName :SearchUserType ;

  city:SearchUserType ;

  birthdate:SearchUserType ;

  constructor() {
    makeAutoObservable(this);
  }

  getUsers = async (params?: RequestUsersForFilter) => {
    const res = await usersService.getAllUsers(params);
    runInAction(() => {
      this.users = res.items;
      this.usersTotalCount = res.total;
      this.perPage = res.perPage;
      this.page = Number(res.page);
    });
  };

  getUsersForFilter = async (params?: RequestUsersForFilter) => {
    const res = await usersService.getUsersForFilters(params);
    console.log(res)
    runInAction(() => {
      this.users = res.items;
      this.usersTotalCount = res.total;
      this.perPage = res.perPage;
      this.page = Number(res.page);
      this.firstName= params?.firstName;
      this.middleName= params?.middleName;
      this.lastName= params?.lastName;
      this.city= params?.city;
      this.birthdate= params?.birthdate;
    });
  };

  createUser = async (
    data: RequestRegister,
  ): Promise<ResponseUserT | undefined | ErrorMessageType> => {
    try {
      const res = await authService.register(data);
      const isError = checkErrorMessage(res);
      if (isError) {
        return isError;
      }
      await this.getUsers();
      return res;
    } catch (e) {
      console.warn(e);
    }
    return undefined;
  };

  updateUser = async (
    data: UpdateUserPayloadT,
    userId: string,
  ): Promise<ResponseUserT | undefined | ErrorMessageType> => {
    try {
      const res = await usersService.updateUser(data, userId);
      const isError = checkErrorMessage(res);
      if (isError) {
        return isError;
      }
      await this.getUsers();
      return res;
    } catch (e) {
      console.warn(e);
    }
    return undefined;
  };

  createParenting = async (data: RequestParenting) => {
    try {
      const res = await usersService.createParenting(data);
      await this.getUsers();
    } catch (e) {
      console.warn(e);
    }
  };

  getOneUser = async (id: string) => {
    try {
      const res = await usersService.getOneUser(id);
      runInAction(() => {
        this.currentUser = res;
      });
      return res;
    } catch (e) {
      console.warn(e);
    }
    return undefined;
  };

  cleanSearchUsersParams = () => {
    this.firstName='';
      this.middleName='';
      this.lastName='';
      this.city='';
      this.birthdate='';
  }

  get getFullUserName() {
    const result = `${this.currentUser?.middleName}" "${this.currentUser?.firstName}" "${this.currentUser?.lastName}`;

    if (result) return 'Иванов Иван Иванович - default';

    return result;
  }
}

export default new UsersStore();
