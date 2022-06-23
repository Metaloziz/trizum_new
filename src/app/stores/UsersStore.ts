import { makeAutoObservable } from 'mobx';

class UsersStore {
  constructor() {
    makeAutoObservable(this);
  }
}
export default new UsersStore();
