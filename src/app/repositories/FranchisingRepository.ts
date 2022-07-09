import { FrinchisingViewModel } from "app/viewModels/FrinchisingViewModel";
import { HttpClient } from "app/rest/HttpClient";
import { Paths } from "app/enums/Paths";
import tokenService from "app/services/tokenService";

export class FranchisingRepository {
    private readonly token = tokenService.getLocalAccessToken();

    readonly list = async () => {
        return new HttpClient(Paths.Franchises, "GET")
            .withTimeout(10000)
            .withBearerAuthorization(this.token)
            .withJsonReviver()
            .execute<FrinchisingViewModel[]>();
    }

    readonly byId = async (id: string) => {
        return new HttpClient(`${Paths.Franchises}/${id}`, "GET")
            .withTimeout(10000)
            .withBearerAuthorization(this.token)
            .withJsonReviver()
            .execute<FrinchisingViewModel>();
    }

    readonly addOrEdit = async (model: FrinchisingViewModel) => {
        //TODO: метод редактирования записи: если id пустой - создание, в противном случае редактирование
        return new HttpClient(model.id ? Paths.Franchises : Paths.Franchises, "POST")
            .withTimeout(10000)
            .withBearerAuthorization(this.token)
            .execute();
    }
}