import { makeAutoObservable, runInAction } from 'mobx';

import worksService from 'app/services/worksService';
import { ResponseWork } from 'app/types/CourseTypes';
import { PresetT, RequestCreateWork } from 'app/types/WorkTypes';

class WorksStore {
  currentHomework?: ResponseWork;

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentWork = (work?: ResponseWork) => {
    this.currentHomework = work;
  };

  createHomework = async (work: RequestCreateWork) => {
    try {
      await worksService.createWork(work);
    } catch (e) {
      console.warn(e);
    }
  };

  editHomework = async (work: RequestCreateWork, id: string) => {
    try {
      await worksService.editWork(work, id);
    } catch (e) {
      console.warn(e);
    }
  };
}
export default new WorksStore();
