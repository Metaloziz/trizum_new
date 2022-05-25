import { makeAutoObservable } from 'mobx';

class Calendar {
  isShow = false;
  
  constructor() {
    makeAutoObservable(this);
  }
  
  setShow = (isShow: boolean) => {
    this.isShow = isShow;
  };
}

export default new Calendar();
