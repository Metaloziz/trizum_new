import { AxiosError } from 'axios';
import { autorun, makeAutoObservable, runInAction } from 'mobx';
import * as yup from 'yup';

import coursesService from 'app/services/coursesService';
import franchiseService from 'app/services/franchiseService';
import groupsService from 'app/services/groupsService';
import usersService from 'app/services/usersService';
import { Roles } from 'app/stores/appStore';
import { ResponseCourse } from 'app/types/CourseTypes';
import { FranchiseT } from 'app/types/FranchiseTypes';
import { CreateGroup, GroupParams, ResponseGroups, ResponseOneGroup } from 'app/types/GroupTypes';
import { RequestUsersParams, ResponseUserT } from 'app/types/UserTypes';
import { GroupsViewModel } from 'app/viewModels/GroupsViewModel';

class GroupStore {
  groups: ResponseGroups[] = [];

  page = 0;

  perPage = 0;

  total = 0;

  currentGroup?: ResponseOneGroup;

  private defaultValues: CreateGroup = {
    name: '',
    franchiseId: '',
    dateSince: '',
    dateUntil: '',
    type: '',
    teacherId: '',
    level: '',
    courseId: '',
  };

  private queryDefaultValues: GroupParams = {
    perPage: 5,
    page: 0,
    name: '',
    forGroupId: '',
    franchiseId: '',
    teacherId: '',
    dateSince: '',
    dateUntil: '',
    type: '',
    level: '',
  };

  modalFields = { ...this.defaultValues };

  queryFields = { ...this.queryDefaultValues };

  franchise: FranchiseT[] = [];

  teachers: ResponseUserT[] = [];

  courses: ResponseCourse[] = [];

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

  loadInitialModal = () => {
    this.execute(async () => {
      const resFranchise = await franchiseService.getAll();
      runInAction(() => {
        this.franchise = resFranchise;
      });
    });
  };

  loadModal = () => {
    this.execute(async () => {
      const resTeachers = await usersService.getAllUsers({
        role: Roles.Teacher,
        franchiseId: this.modalFields.franchiseId,
        perPage: 10000,
      } as RequestUsersParams);
      const resCourses = await coursesService.getAllCourses({ perPage: 10000 });
      runInAction(() => {
        this.teachers = resTeachers.items;
        this.courses = resCourses.items;
      });
    });
  };

  getGroups = async () => {
    this.currentGroup = undefined;
    await this.execute(async () => {
      const res = await groupsService.getGroups(this.queryFields);
      res.items.length && (await this.getOneGroup(res.items[0].id));
      runInAction(() => {
        this.groups = res.items;
        this.page = res.page;
        this.perPage = res.perPage;
        this.total = res.total;
      });
    });
  };

  getOneGroup = async (id: string) => {
    await this.execute(async () => {
      const res = await groupsService.getOneGroup(id);
      runInAction(() => {
        this.currentGroup = res;
      });
    });
  };

  addGroup = async () => {
    await groupsService.addGroup(this.modalFields);
  };

  cleanModalValues = () => {
    this.modalFields = { ...this.defaultValues };
  };

  clearQueryFields = () => {
    this.queryFields = { ...this.queryDefaultValues };
    this.getGroups()
  };

  get filteredCourses() {
    return this.courses.filter(el => el.level.includes(this.modalFields.level));
  }

  get validateSchema() {
    return yup.object<Record<keyof GroupsViewModel, any>>().shape({
      name: yup.string().required('*'),
      franchiseId: yup.string().required('*'),
      dateSince: yup.string().required('*'),
      dateUntil: yup.string().required('*'),
      type: yup.string().required('*'),
      teacherId: yup.string().required('*'),
      level: yup.string().required('*'),
      courseId: yup.string().required('*'),
    });
  }
}
export default new GroupStore();
