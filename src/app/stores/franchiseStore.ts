import { makeAutoObservable, runInAction } from 'mobx';

import franchiseService from 'app/services/franchiseService';
import { Franchise, RequestCreateFranchise } from 'app/types/FranchiseTypes';

class FranchiseStore {
  franchises: Franchise[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getAllFranchise = async () => {
    const res = await franchiseService.getAll();
    runInAction(() => {
      this.franchises = res.reverse();
    });
  };

  createFranchise = async (data: RequestCreateFranchise) => {
    await franchiseService.create(data);
    await this.getAllFranchise();
  };
}
export default new FranchiseStore();
