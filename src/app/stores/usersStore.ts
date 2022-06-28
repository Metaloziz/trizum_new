import authService from '@app/services/authService';
import usersService, { ResponseUserT } from '@app/services/usersService';
import { RequestRegister } from '@app/types/AuthTypes';
import { makeAutoObservable, runInAction } from 'mobx';

class UsersStore {
  users: ResponseUserT[] = [];

  usersTotalCount = 0;

  constructor() {
    makeAutoObservable(this);
  }

  getUsers = async () => {
    const res = await usersService.getAllUsers();
    runInAction(() => {
      this.users = res.users.reverse();
      this.usersTotalCount = res.total;
    });
  };

  createUser = async (data: RequestRegister) => {
    try {
      await authService.register(data);
      await this.getUsers()
    } catch (e) {
      console.log(e);
    }
  };
}
export default new UsersStore();
