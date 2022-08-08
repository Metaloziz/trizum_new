import * as yup from 'yup';

import { makeObservable, observable } from "mobx";

import { CourseViewModel } from "app/viewModels/CourseViewModel";
import { MethodistMainFilterViewModel } from "./models/MethodistMainFilterViewModel";
import { MethodistMainRepository } from "./repositories";
import { Nullable } from "app/types/Nullable";
import { StoreBase } from "app/stores/StoreBase";

export class MethodistMainStore extends StoreBase {

    private _repository = new MethodistMainRepository();

    private _defaultValue = (): CourseViewModel => ({
        title: "",
        level: "",
        works: [],
        createdAt: null!
    });

    pagination: {
        page: number;
        rowsPerPage: number;
        total: number;
    } = {
            page: 0,
            rowsPerPage: 5,
            total: 0
        };

    editingEntity: CourseViewModel = this._defaultValue();

    entities: CourseViewModel[] = [];

    isDialogOpen: boolean = false;

    filter: Nullable<MethodistMainFilterViewModel> = null;

    constructor() {
        super();

        makeObservable(this, {
            editingEntity: observable,
            entities: observable,
            isDialogOpen: observable,
            filter: observable
        });
    }

    openDialog = (editingEntity?: CourseViewModel) => {
        this.editingEntity = editingEntity ? { ...editingEntity } : this._defaultValue();
        this.isDialogOpen = true;
    };

    closeDialog = () => {
        this.isDialogOpen = false;
    };

    list = async () => {
        return this.execute(async () => {
            const paginationResponse = await this._repository.list(this.pagination.page);
            this.entities = paginationResponse.items;
            this.pagination = {
                page: paginationResponse.page,
                rowsPerPage: paginationResponse.perPage,
                total: paginationResponse.total
            };
        });
    };

    addOrEdit = async () => {
        this.closeDialog();

        this.execute(async () => {
            //await this._repository.addOrEdit(this.editingEntity);
            await this.pull();
        });
    };

    remove = async (id: string) => {
        this.execute(async () => {
            //await this._repository.remove(id);
            await this.pull();
        });
    };

    pull = async () => {
        this.execute(async () => this.list());
    };

    onChangeFilter = (filter: Nullable<MethodistMainFilterViewModel>) => {
        this.filter = filter;
    };

    changePage = async (page: number) => {
        console.log(page);
        this.pagination.page = page;
        this.execute(async () => await this.list());
    }

    get validateSchema() {
        return yup.object<Record<keyof CourseViewModel, any>>().shape({
            title: yup.string().required('*'),
            level: yup.string().required('*')
        });
    }

    get filteredEntities() {
        if (!this.filter) {
            return this.entities;
        }

        let result: CourseViewModel[] = [];

        if (this.filter.title.trim()) {
            result = this.entities.filter(entity =>
                (entity.title ?? "").toLowerCase().includes(this.filter!.title.toLowerCase()),
            );
        }

        if (this.filter.level.trim()) {
            result = this.entities.filter(entity =>
                (entity.level ?? "").toLowerCase().includes(this.filter!.level.toLowerCase()),
            );
        }

        //TODO: дописать остальные фильтры

        return result;
    }
}