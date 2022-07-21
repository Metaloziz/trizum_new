import { makeAutoObservable, runInAction } from 'mobx';

import authService from 'app/services/authService';
import usersService from 'app/services/usersService';
import { RequestRegister } from 'app/types/AuthTypes';
import {
  RequestParenting,
  RequestUsersParams,
  ResponseOneUser,
  ResponseUserT,
} from 'app/types/UserTypes';
import { checkErrorMessage, ErrorMessageType } from 'utils/checkErrorMessage';

class UsersStore {
  users: ResponseUserT[] = [];

  usersTotalCount = 1;

  page = 1;

  perPage = 5;

  currentUser?: ResponseOneUser;

  constructor() {
    makeAutoObservable(this);
  }

  getUsers = async (params?: RequestUsersParams) => {
    const res = await usersService.getAllUsers(params);
    runInAction(() => {
      this.users = res.items;
      this.usersTotalCount = res.total;
      this.perPage = res.perPage;
      this.page = Number(res.page);
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
}
export default new UsersStore();
