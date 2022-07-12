import React from 'react';

import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import * as yup from 'yup';

import { FranchisingFilterViewModel } from './models/FranchisingFilterViewModel';

import { Nullable } from 'app/types/Nullable';
import { FranchisingViewModel } from 'app/viewModels/FranchisingViewModel';
import { FranchisingRepository } from 'components/franchising-page/repositories';

export class FranchisingStore {
  private repository = new FranchisingRepository();

  private _defaultValue = (): FranchisingViewModel => ({
    actualAddress: '',
    bankBik: '',
    bankBill: '',
    bankInn: '',
    bankKpp: '',
    bankName: '',
    email: '',
    fullName: '',
    shortName: '',
    schoolName: '',
    ogrn: '',
    kpp: '',
    legalAddress: '',
    phone: null!,
    inn: '',
    city: '',
    checkingAccount: '',
  });

  isLoading: boolean = false;

  error: Nullable<Error> = null;

  success: Nullable<React.ReactNode> = null;

  editingEntity: FranchisingViewModel = this._defaultValue();

  entities: FranchisingViewModel[] = [];

  isDialogOpen: boolean = false;

  filter: Nullable<FranchisingFilterViewModel> = null;

  constructor() {
    makeAutoObservable(this);
  }

  openDialog = (editingEntity?: FranchisingViewModel) => {
    this.editingEntity = editingEntity ? { ...editingEntity } : this._defaultValue();
    this.isDialogOpen = true;
  };

  closeDialog = () => {
    this.isDialogOpen = false;
  };

  execute = async <T>(action: () => Promise<T>) => {
    try {
      this.isLoading = true;
      await action();
    } catch (error) {
      // TODO: что делать в случае ошибку, выводить в Snackbar?
      error = axios.isAxiosError(error)
        ? new Error(error.message)
        : typeof error === 'string'
        ? new Error(error)
        : error;
    } finally {
      this.isLoading = false;
    }
  };

  list = async () => {
    this.execute(async () => {
      this.entities = await this.repository.list();
    });
  };

  getById = async (id: string) => {
    this.execute(async () => {
      const entity = await this.repository.byId(id);
    });
  };

  addOrEdit = async (/* data: FranchisingViewModel */) => {
    this.closeDialog();

    this.execute(async () => {
      await this.repository.addOrEdit(this.editingEntity);
      await this.pull();
    });
  };

  remove = async (id: string) => {
    this.execute(async () => {
      await this.repository.remove(id);
      await this.pull();
    });
  };

  pull = async () => {
    this.execute(async () => this.list());
  };

  onChangePhone = (value: string) => {
    this.editingEntity.phone = !value ? null! : parseInt(value.replace(/\D/g, ''), 10);
  };

  onChangeFilter = (filter: Nullable<FranchisingFilterViewModel>) => {
    this.filter = filter;
  };

  get validateSchema() {
    return yup.object<Record<keyof FranchisingViewModel, any>>().shape({
      fullName: yup.string().required('*'),
      shortName: yup.string().required('*'),
      inn: yup.string().min(10).max(12).required('*'),
      phone: yup.number().required('*'),
      email: yup.string().email().required('*'),
      legalAddress: yup.string().required('*'),
      actualAddress: yup.string().required('*'),
      kpp: yup.string().min(9).max(9).required('*'),
      ogrn: yup.string().min(13).max(15).required('*'),
      city: yup.string().required('*'),
      schoolName: yup.string().required('*'),
      bankName: yup.string().required('*'),
      bankBik: yup.string().required('*'),
      bankInn: yup.string().min(10).max(12).required('*'),
      bankKpp: yup.string().min(9).max(9).required('*'),
      bankBill: yup.string().required('*'),
      checkingAccount: yup.string().required('*'),
    });
  }

  get filteredEntities() {
    if (!this.filter) {
      return this.entities;
    }

    let result: FranchisingViewModel[] = [];

    if (this.filter.fullName.trim()) {
      result = this.entities.filter(entity =>
        entity.fullName.toLowerCase().includes(this.filter!.fullName.toLowerCase()),
      );
    }

    if (this.filter.shortName.trim()) {
      result = this.entities.filter(entity =>
        entity.shortName.toLowerCase().includes(this.filter!.shortName.toLowerCase()),
      );
    }

    if (this.filter.inn.trim()) {
      result = this.entities.filter(entity =>
        entity.inn.toLowerCase().includes(this.filter!.inn.toLowerCase()),
      );
    }

    if (this.filter.email.trim()) {
      result = this.entities.filter(entity =>
        entity.email.toLowerCase().includes(this.filter!.email.toLowerCase()),
      );
    }

    if (this.filter.city.trim()) {
      result = this.entities.filter(entity =>
        entity.city.toLowerCase().includes(this.filter!.city.toLowerCase()),
      );
    }

    if (this.filter.checkingAccount.trim()) {
      result = this.entities.filter(entity =>
        entity.checkingAccount.toLowerCase().includes(this.filter!.checkingAccount.toLowerCase()),
      );
    }

    if (this.filter.phone) {
      result = this.entities.filter(entity =>
        (entity.phone?.toString() ?? '').includes(this.filter!.phone.toString()),
      );
    }

    return result;
  }
}
