import { makeAutoObservable } from 'mobx';

class Calendar {
  isShow = false;

  constructor() {
    makeAutoObservable(this);
  }

  isOpen = () => {
    this.isShow = true;
  };

  isClose = () => {
    this.isShow = false;
  };
}

export default new Calendar();
