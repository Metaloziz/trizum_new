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
    type: 'blocks',
    teacherId: '',
    level: 'easy',
    courseId: '',
  };

  modalFields = { ...this.defaultValues };

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

  loadCurrentGroup = (franchiseId: string, selectedRole: Roles | undefined) => {
    this.groups = []; // todo так на прямую можно менять ?
    this.execute(async () => {
      let copyGroups: ResponseGroups[] = [];
      if (selectedRole === Roles.Student) {
        await this.getGroups({ franchise_id: franchiseId, type: 'class' });

        copyGroups = [...this.groups];

        await this.getGroups({
          franchise_id: franchiseId,
          type: 'olympiad',
        });

        runInAction(() => {
          this.groups = [...this.groups, ...copyGroups];
        });
      }

      if (selectedRole === Roles.Teacher || selectedRole === Roles.TeacherEducation) {
        copyGroups = [];
        await this.getGroups({ franchise_id: franchiseId, type: 'blocks' });
        // copyGroups = [...this.groups]; // todo проверить логику
        // runInAction(() => {
        //   this.groups = [...copyGroups];
        // });
      }
    });
  };

  addUserGroup = (data: AddUserGroupPayloadType) => {
    this.execute(async () => {
      const response = await groupsService.addUserGroup(data);
    });
  };

  loadInitialModal = () => {
    this.execute(async () => {
      const resFranchise = await franchiseService.getAll();
      runInAction(() => {
        this.franchise = resFranchise as unknown[] as FranchiseT[];
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

  getGroups = async (params?: GroupParams) => {
    await this.execute(async () => {
      const res = await groupsService.getGroups({
        perPage: 1000,
        franchise_id: params?.franchise_id,
        type: params?.type,
        level: params?.level,
      });
      await this.getOneGroup(res.items[0].id);
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

  cleanValues = () => {
    this.modalFields = { ...this.defaultValues };
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
