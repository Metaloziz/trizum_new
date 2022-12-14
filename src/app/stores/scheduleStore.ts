import { AxiosError } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import groupsService from 'app/services/groupsService';
import { ScheduleForUI } from 'app/types/GroupTypes';
import { scheduleMapper } from 'app/types/mappers/ScheduleMapper';
import usersService from 'app/services/usersService';
import { Roles } from 'app/stores/appStore';
import franchiseService from 'app/services/franchiseService';

class GroupStore {
  defaultFilters = {
    groupId: '',
    teacherId: '',
    franchise: '',
  };

  schedule: ScheduleForUI[] = [];

  groups: { groupName: string; groupId: string }[] = [];

  filters = { ...this.defaultFilters };

  teachers: { teacherId: string; teacherName: string }[] = [];

  franchisees: { franchise: string; franchiseName: string }[] = [];

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
    const res = await groupsService.getGroups({ perPage: 1000 });
    runInAction(() => {
      if (!!res.items) {
        this.groups = res.items.map(el => ({ groupName: el.name, groupId: el.id }));
        this.schedule = res.items.length
          ? res.items
              .map(group =>
                scheduleMapper(
                  group.schedule,
                  group.name,
                  group.id,
                  group.teacherId,
                  group.franchise,
                ),
              )
              .reduce((acc, elem) => [...acc, ...elem], [] as ScheduleForUI[])
          : [];
      }
    });
  };

  getTeachers = async () => {
    const res = await usersService.getAllUsers({ role: Roles.Teacher, perPage: 1000 });
    runInAction(() => {
      this.teachers = res.items.map(el => ({
        teacherId: el.id,
        teacherName: `${el.lastName} ${el.firstName} ${el.middleName}`,
      }));
    });
  };

  getFranchise = async () => {
    const res = await franchiseService.getAll();
    runInAction(() => {
      // @ts-ignore
      this.franchisees = res.map(el => ({
        franchise: el.id,
        franchiseName: el.shortName,
      }));
    });
  };

  setFilters = (filterValue: string, newValue: string) => {
    this.filters = { ...this.filters, [filterValue]: newValue === '*' ? '' : newValue };
  };

  get actualSchedule() {
    const withFilter = this.schedule.filter(
      el =>
        el.teacherId.includes(this.filters.teacherId) &&
        el.franchise.includes(this.filters.franchise),
    );
    return withFilter.filter(el => el.groupId.includes(this.filters.groupId));
  }
}
export default new GroupStore();
