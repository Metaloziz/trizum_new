import { makeAutoObservable } from 'mobx';

class CardStudentExtended {
  isSetting = false;

  isParents = false;

  constructor() {
    makeAutoObservable(this);
  }

  changeSetting = () => {
    this.isSetting = !this.isSetting;
  };

  changeParents = () => {
    this.isParents = !this.isParents;
  };
}

const modals = new CardStudentExtended();

export default modals;
