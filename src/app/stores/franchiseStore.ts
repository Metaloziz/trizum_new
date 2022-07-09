import React from 'react';

import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

import { FranchisingRepository } from 'app/repositories/FranchisingRepository';
import { Nullable } from 'app/types/Nullable';
import { FrinchisingViewModel } from 'app/viewModels/FrinchisingViewModel';

export class FranchiseStore {
  private repository = new FranchisingRepository();

  loading: boolean = false;

  error: Nullable<Error> = null;

  success: Nullable<React.ReactNode> = null;

  entities: FrinchisingViewModel[] = [];

  isDialogOpen: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  openDialog = () => {
    this.isDialogOpen = true;
  };

  closeDialog = () => {
    this.isDialogOpen = false;
  };

  execute = async <T>(action: () => Promise<T>) => {
    try {
      this.loading = true;
      await action();
    } catch (error) {
      // TODO: что делать в случае ошибку, выводить в Snackbar?
      error = axios.isAxiosError(error)
        ? new Error(error.message)
        : typeof error === 'string'
        ? new Error(error)
        : error;
    } finally {
      this.loading = false;
    }
  };

  list = async () => {
    this.execute(async () => {
      this.entities = await this.repository.list();
    });
  };

  addOrEdit = async (model: FrinchisingViewModel) => {
    this.execute(async () => {
      await this.repository.addOrEdit(model);
      await this.pull();
    });
  };

  pull = async () => {
    this.execute(async () => {
      await this.list();
    });
  };
}
