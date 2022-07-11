import { FranchisingRepository } from "components/franchising-page/repositories";
import { FranchisingViewModel } from "app/viewModels/FranchisingViewModel";
import { Nullable } from "app/types/Nullable";
import React from "react";
import axios from "axios";
import { makeAutoObservable } from "mobx";

export class FranchisingStore {

  private repository = new FranchisingRepository();

  private _defaultValue = (): FranchisingViewModel => ({
    actualAddress: "",
    bankBik: "",
    bankBill: "",
    bankInn: "",
    bankKpp: "",
    bankName: "",
    email: "",
    fullName: "",
    shortName: "",
    schoolName: "",
    ogrn: "",
    kpp: "",
    legalAddress: "",
    phone: "",
    inn: "",
    city: "",
    checkingAccount: ""
  })

  isLoading: boolean = false;
  error: Nullable<Error> = null;
  success: Nullable<React.ReactNode> = null;

  editingEntity: FranchisingViewModel = this._defaultValue();
  entities: FranchisingViewModel[] = [];
  isDialogOpen: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  openDialog = (editingEntity?: FranchisingViewModel) => {
    this.editingEntity = editingEntity
      ? { ...editingEntity }
      : this._defaultValue();
    this.isDialogOpen = true;
  }

  closeDialog = () => {
    this.isDialogOpen = false;
  }

  execute = async <T>(action: () => Promise<T>) => {
    try {
      this.isLoading = true;
      await action();
    } catch (error) {
      //TODO: что делать в случае ошибку, выводить в Snackbar?
      error = axios.isAxiosError(error)
        ? new Error(error.message)
        : typeof error === "string"
          ? new Error(error)
          : error;
    } finally {
      this.isLoading = false;
    }
  }

  list = async () => {
    this.execute(async () => {
      this.entities = await this.repository.list();
    });
  };

  getById = async (id: string) => {
    this.execute(async () => {
      const entity = await this.repository.byId(id);
    });
  }

  addOrEdit = async (/*data: FranchisingViewModel*/) => {
    this.closeDialog();

    this.execute(async () => {
      await this.repository.addOrEdit(this.editingEntity);
      this.pull();
    })
  };

  remove = async (id: string) => {
    this.execute(async () => {
      await this.repository.remove(id);
      this.pull();
    })
  }

  pull = async () => {
    this.execute(async () => {
      await this.list();
    })
  }
  
}