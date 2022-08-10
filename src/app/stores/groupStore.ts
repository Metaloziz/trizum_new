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
} from 'app/types/GroupTypes';
import { RequestUsersParams, ResponseUserT } from 'app/types/UserTypes';
import { GroupsViewModel } from 'app/viewModels/GroupsViewModel';

class GroupStore {
  groups: ResponseGroups[] = [];

  page = 0;

  perPage = 0;

  total = 0;

  visibleGroup?: ResponseOneGroup;

  selectedGroup?: ResponseOneGroup | ResponseGroups;

  private defaultValues: CreateGroup = {
    name: '',
    franchiseId: '',
    dateSince: '20.02.2020',
    dateUntil: '20.01.2023',
    type: 'blocks',
    teacherId: '',
    level: 'easy',
    courseId: '',
    status: 'active',
  };

  private queryDefaultValues: GroupParams = {
    perPage: 10,
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

  private defaultEditValues: Partial<CreateGroup> = {};

  modalFields = { ...this.defaultValues };

  queryFields = { ...this.queryDefaultValues };

  franchise: FranchiseT[] = [];

  teachers: ResponseUserT[] = [];

  courses: ResponseCourse[] = [];

  isLoad = false;

  isModalOpen = false;

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

  loadCurrentGroups = (franchiseId: string, selectedRole: Roles | undefined) => {
    this.groups = [];
    this.execute(async () => {
      let copyGroups: ResponseGroups[] = [];
      if (selectedRole === Roles.Student) {
        await this.getGroups();

        copyGroups = [...this.groups];

        await this.getGroups();

        runInAction(() => {
          this.groups = [...this.groups, ...copyGroups];
        });
      }

      if (selectedRole === Roles.TeacherEducation) {
        copyGroups = [];
        await this.getGroups();
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
      const res1 = await coursesService.getAllCourses({ perPage: 10000 });
      runInAction(() => {
        // @ts-ignore
        this.franchise = resFranchise;
        this.courses = res1.items;
      });
    });
  };

  getGroups = async () => {
    this.visibleGroup = undefined;
    await this.execute(async () => {
      const res = await groupsService.getGroups(this.queryFields);
      if (res.items.length) {
        const asd = await this.getOneGroup(
          this.selectedGroup ? this.selectedGroup.id : res.items[0].id,
        );
        if (typeof asd !== 'string') {
          this.visibleGroup = asd;
        }
      }
      runInAction(() => {
        this.groups = res.items;
        this.page = res.page;
        this.perPage = res.perPage;
        this.total = res.total;
      });
    });
  };

  getOneGroup = async (id: string) =>
    this.execute(async () => {
      const r = await groupsService.getOneGroup(id);
      runInAction(() => {
        console.log({...r},'asdasd');
        this.selectedGroup = r;
        this.visibleGroup = r;
      });
      return r;
    });

  addGroup = async () => {
    await groupsService.addGroup(this.modalFields);
  };

  editGroup = async () => {
    await this.execute(async () => {
      if (this.selectedGroup) {
        await groupsService.editGroup(this.modalFields, this.selectedGroup.id);
        await this.getGroups();
      }
    });
  };

  cleanModalValues = () => {
    this.modalFields = { ...this.defaultValues };
  };

  clearQueryFields = () => {
    this.queryFields = { ...this.queryDefaultValues };
    this.getGroups();
  };

  openModal = (id?: string) => {
    if (id) {
      const r = this.groups.filter(el => el.id === id)[0];
      // const r = await this.getOneGroup(id);
      this.selectedGroup = r;
      this.modalFields = {
        level: (r.level as LevelGroupT) || '',
        franchiseId: r.franchise || '',
        type: (r.type as GroupT) || '',
        courseId: r.course || '',
        teacherId: r.teacherId,
        name: r.name,
        dateSince: r.startedAt.date,
        dateUntil: r.endedAt.date,
        status: r.status || '',
      };
    }
    this.isModalOpen = true;
  };

  closeModal = () => {
    this.selectedGroup = undefined;
    this.isModalOpen = false;
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
