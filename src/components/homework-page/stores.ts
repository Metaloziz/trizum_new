import { makeObservable, observable } from 'mobx';
import * as yup from 'yup';

import { HomeworkRepository } from './repositories';

import { StoreBase } from 'app/stores/StoreBase';
import { HomeworkViewModel } from 'app/viewModels/HomeworkViewModel';

export class HomeworkStore extends StoreBase {
  private _repository = new HomeworkRepository();

  isDialogOpen: boolean = false;

  entities: HomeworkViewModel[] = [];

  pagination: {
    page: number;
    rowsPerPage: number;
    total: number;
  } = {
    page: 0,
    rowsPerPage: 5,
    total: 0,
  };

  private _defaultValue = (): HomeworkViewModel => ({
    text: '',
    title: '',
    type: 'hw',
    gamePresets: [],
  });

  editingEntity: HomeworkViewModel = this._defaultValue();

  constructor() {
    super();
    makeObservable(this, {
      editingEntity: observable,
      entities: observable,
      isDialogOpen: observable,
    });
  }

  openDialog = (editingEntity?: HomeworkViewModel) => {
    this.editingEntity = editingEntity ? { ...editingEntity } : this._defaultValue();
    this.isDialogOpen = true;
  };

  closeDialog = () => {
    this.isDialogOpen = false;
  };

  list = async () =>
    this.execute(async () => {
      const paginationResponse = await this._repository.list(this.pagination.page);

      this.entities = paginationResponse.items;
      this.pagination = {
        page: paginationResponse.page,
        rowsPerPage: paginationResponse.perPage,
        total: paginationResponse.total,
      };
    });

  addOrEdit = async () => {
    this.closeDialog();

    this.execute(async () => {
      await this._repository.addOrEdit(this.editingEntity);
      await this.pull();
    });
  };

  remove = async (id: string) => {
    this.execute(async () => {
      await this._repository.remove(id);
      await this.pull();
    });
  };

  pull = async () => {
    this.execute(async () => await this.list());
  };

  changePage = async (page: number) => {
    console.log(page);
    this.pagination.page = page;
    this.execute(async () => await this.list());
  };

  get validateSchema() {
    return yup.object<Record<keyof HomeworkViewModel, any>>().shape({
      title: yup.string().required('*'),
      text: yup.string().required('*'),
    });
  }
}
