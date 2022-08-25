import { AxiosError } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import * as yup from 'yup';

import coursesService from 'app/services/coursesService';
import franchiseService from 'app/services/franchiseService';
import groupsService, { AddUserGroupPayloadType } from 'app/services/groupsService';
import usersService from 'app/services/usersService';
import { Roles } from 'app/stores/appStore';
import { ResponseCourse } from 'app/types/CourseTypes';
import { FranchiseT } from 'app/types/FranchiseTypes';
import {
  CreateGroup,
  GroupParams,
  GroupT,
  LevelGroupT,
  ResponseGroups,
  ResponseOneGroup,
  Schedule,
} from 'app/types/GroupTypes';
import { RequestUsersParams, ResponseUserT } from 'app/types/UserTypes';
import { GroupsViewModel } from 'app/viewModels/GroupsViewModel';

class GroupStore {
  schedule: any[] = [];

  currentGroup?: ResponseGroups;

  isLoad = false;

  constructor() {
    makeAutoObservable(this);
  }

  execute = async <T>(action: () => Promise<T>) => {
    try {
      this.isLoad = true;
      return await action();
    } catch (e) {
      // TODO: handle error
      return (e as AxiosError).message;
    } finally {
      this.isLoad = false;
    }
  };

  getGroups = async () => {
    const res = await groupsService.getGroups();
    runInAction(() => {
      // eslint-disable-next-line prefer-destructuring
      const group = res.items[1];
      // eslint-disable-next-line prefer-destructuring
      const qwe = res.items.map(el => el.schedule)[1];
      this.schedule = qwe.map((el, idx) => {
        const dateAr: number[] = el.date.split('.').map(elem => Number(elem));
        const timeStartAr: number[] = el.from.split(':').map(elem => Number(elem));
        const timeEndAr: number[] = el.to.split(':').map(elem => Number(elem));
        return {
          id: idx,
          groupName: group.name,
          lesson: el.name,
          start: new Date(
            2000 + dateAr[2],
            dateAr[1] - 1,
            dateAr[0],
            timeStartAr[0],
            timeStartAr[1],
          ),
          end: new Date(2000 + dateAr[2], dateAr[1] - 1, dateAr[0], timeEndAr[0], timeEndAr[1]),
        };
      });
    });
  };
}
export default new GroupStore();
