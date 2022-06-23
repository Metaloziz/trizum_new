import worksService from '@app/services/worksService';
import { PresetT } from '@app/types/WorkTypes';
import { makeAutoObservable, runInAction } from 'mobx';

class WorksStore {
  presets: PresetT[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getPresets = async () => {
    const res = await worksService.getPresets();
    runInAction(() => {
      this.presets = res;
    });
  };
}
export default new WorksStore();
