import { HomeworkViewModel } from "app/viewModels/HomeworkViewModel";
import { HttpClient } from "app/rest/HttpClient";
import { PaginationResponse } from "app/types/PaginationResponse";
import { Paths } from "app/enums/Paths";
import tokenService from "app/services/tokenService";

export class HomeworkRepository {
    private readonly token = tokenService.getLocalAccessToken();

    readonly list = async (page: number = 0) => new HttpClient(Paths.Works, "GET")
        .withTimeout(10000)
        .withBearerAuthorization(this.token)
        .withUrlParamsRequest({ page })
        .withJsonReviver()
        .execute<PaginationResponse<HomeworkViewModel>>();

    readonly byId = async (id: string) =>
        new HttpClient(`${Paths.Works}/${id}`, "GET")
            .withTimeout(10000)
            .withBearerAuthorization(this.token)
            .withJsonReviver()
            .execute<HomeworkViewModel>();

    readonly addOrEdit = async (model: HomeworkViewModel) => {
        return new HttpClient(model.id ? `${Paths.Works}/${model.id}` : Paths.Works, "POST")
            .withTimeout(10000)
            .withBearerAuthorization(this.token)
            .withJsonRequest(model)
            .execute();
    }

    readonly remove = async (id: string) =>
        new HttpClient(`${Paths.Works}/${id}`, "DELETE")
            .withTimeout(10000)
            .withBearerAuthorization(this.token)
            .execute();
}