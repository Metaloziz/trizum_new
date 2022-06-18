import franchiseService from '@app/services/franchiseService';
import { Franchise } from '@app/types/FranchiseTypes';
import { makeAutoObservable, runInAction } from 'mobx';

class FranchiseStore {
  franchises: Franchise[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getAllFranchise = async () => {
    const res = await franchiseService.getAll();
    runInAction(() => {
      this.franchises = res;
    });
  };
}
export default new FranchiseStore();
