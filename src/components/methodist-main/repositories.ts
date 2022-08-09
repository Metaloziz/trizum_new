import { CourseViewModel } from "app/viewModels/CourseViewModel";
import { HttpClient } from "app/rest/HttpClient";
import { PaginationResponse } from "app/types/PaginationResponse";
import { Paths } from "app/enums/Paths";
import tokenService from "app/services/tokenService";

export class MethodistMainRepository {
    private readonly token = tokenService.getLocalAccessToken();

    readonly list = async (page: number = 0) => {
        return new HttpClient(Paths.Courses, "GET")
            .withTimeout(10000)
            .withBearerAuthorization(this.token)
            .withUrlParamsRequest({ page })
            .withJsonReviver()
            .execute<PaginationResponse<CourseViewModel>>();
    }

    readonly addOrEdit = async (model: CourseViewModel) => {
        return new HttpClient(model.id ? `${Paths.Courses}/${model.id}` : Paths.Courses, "POST")
            .withTimeout(10000)
            .withBearerAuthorization(this.token)
            .withJsonRequest(model)
            .execute();
    }
}