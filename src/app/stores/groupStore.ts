import { AxiosError } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import moment from 'moment';
import * as yup from 'yup';

import { DateTime } from 'app/enums/DateTime';
import coursesService from 'app/services/coursesService';
import franchiseService from 'app/services/franchiseService';
import groupsService, { AddUserGroupPayloadType } from 'app/services/groupsService';
import usersService from 'app/services/usersService';
import { Roles } from 'app/stores/appStore';
import { ResponseCourse } from 'app/types/CourseTypes';
import { FranchiseT } from 'app/types/FranchiseTypes';
import {
  CreateGroupForServer,
  CreateGroupFroUI,
  GroupParams, GroupParamsForUI,
  GroupT,
  LessonT,
  LevelGroupT,
  ResponseGroups,
  ResponseOneGroup, Schedule,
} from 'app/types/GroupTypes';
import { RequestUsersParams, ResponseUserT } from 'app/types/UserTypes';
import { GroupsViewModel } from 'app/viewModels/GroupsViewModel';
import {
  scheduleItemToServerMapper,
  scheduleItemToUIMapper,
} from 'utils/scheduleItemToServerMapper';

class GroupStore {
  groups: ResponseGroups[] = [];

  page = 0;

  perPage = 0;

  total = 0;

  selectedGroup?: ResponseOneGroup;

  private defaultValues: CreateGroupFroUI = {
    name: '',
    franchiseId: '',
    dateSince: new Date(),
    dateUntil: new Date(),
    type: 'class',
    teacherId: '',
    level: 'medium',
    courseId: '',
    status: 'active',
  };

  private queryDefaultValues: GroupParamsForUI = {
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

  private defaultEditValues: Partial<CreateGroupFroUI> = {};

  modalFields = { ...this.defaultValues };

  queryFields = { ...this.queryDefaultValues };

  schedule: LessonT[] = [];

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
    const dateSince = this.queryFields.dateSince ? moment(this.queryFields.dateSince).format(DateTime.DdMmYyyy) : ''
    const dateUntil = this.queryFields.dateUntil ? moment(this.queryFields.dateUntil).format(DateTime.DdMmYyyy) : ''
    await this.execute(async () => {
      const res = await groupsService.getGroups({
        ...this.queryFields,
        dateSince,
        dateUntil,
      });
      if (res.items.length && this.selectedGroup?.id) {
        await this.getOneGroup(this.selectedGroup.id);
      }
      runInAction(() => {
        this.groups = res.items;
        this.page = res.page;
        this.perPage = res.perPage;
        this.total = res.total;
      });
    });
  };

  setEmptyScheduleItems = (count: number) =>
    count === 0
      ? []
      : Array(count)
          .fill(1)
          .map(el => new LessonT((Math.random() * 100).toString()));

  getOneGroup = async (id: string) =>
    this.execute(async () => {
      const r = await groupsService.getOneGroup(id);
      runInAction(() => {
        this.selectedGroup = r;
        this.schedule =
          r.schedule && r.schedule.length
            ? r.schedule.map(el => scheduleItemToUIMapper(el))
            : this.setEmptyScheduleItems(r.course.worksCount);
      });
      return r;
    });

  addGroup = async () => {
    const schedule: Schedule[] = !this.schedule.length
      ? []
      : this.schedule.map(elem => scheduleItemToServerMapper(elem));
    await groupsService.addGroup({
      ...this.modalFields,
      dateSince: moment(this.modalFields.dateSince).format(DateTime.DdMmYyyy),
      dateUntil: moment(this.modalFields.dateUntil).format(DateTime.DdMmYyyy),
      schedule,
    });
    this.cleanModalValues();
    this.closeModal();
  };

  editGroup = async () => {
    await this.execute(async () => {
      if (this.selectedGroup) {
        const schedule: Schedule[] = !this.schedule.length
          ? []
          : this.schedule.map(elem => scheduleItemToServerMapper(elem));
        await groupsService.editGroup(
          {
            ...this.modalFields,
            dateSince: moment(this.modalFields.dateSince).format(DateTime.DdMmYyyy),
            dateUntil: moment(this.modalFields.dateUntil).format(DateTime.DdMmYyyy),
            schedule,
          },
          this.selectedGroup.id,
        );
        await this.getGroups();
      }
      this.cleanModalValues();
      this.closeModal();
    });
  };

  cleanModalValues = () => {
    this.modalFields = { ...this.defaultValues };
  };

  clearQueryFields = () => {
    this.queryFields = { ...this.queryDefaultValues };
    this.getGroups();
  };

  changeLesson = (id: string, fieldName: string, value: Date | string) => {
    this.schedule = this.schedule.map(el => (el.id === id ? { ...el, [fieldName]: value } : el));
  };

  openModal = async (id?: string) => {
    if (id) {
      // const r = this.groups.filter(el => el.id === id)[0];
      const r = await this.getOneGroup(id);
      if (typeof r === 'object') {
        this.modalFields = {
          level: (r.level as LevelGroupT) || '',
          franchiseId: r.franchise.id || '',
          type: (r.type as GroupT) || '',
          courseId: r.course.id || '',
          teacherId: r.teacherId,
          name: r.name,
          dateSince: new Date(r.startedAt.date),
          dateUntil: new Date(r.endedAt.date),
          status: r.status || '',
        };
      }
    }
    this.isModalOpen = true;
  };

  closeModal = () => {
    this.schedule = [];
    this.selectedGroup = undefined;
    this.isModalOpen = false;
  };

  get filteredCourses() {
    return this.courses ? this.courses.filter(el => el.level.includes(this.modalFields.level)) : [];
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
