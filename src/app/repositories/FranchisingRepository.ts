import { Paths } from 'app/enums/Paths';
import { HttpClient } from 'app/rest/HttpClient';
import tokenService from 'app/services/tokenService';
import { FrinchisingViewModel } from 'app/viewModels/FrinchisingViewModel';

export class FranchisingRepository {
  private readonly token = tokenService.getLocalAccessToken();

  readonly list = async () =>
    new HttpClient(Paths.Franchises, 'GET')
      .withTimeout(10000)
      .withBearerAuthorization(this.token)
      .withJsonReviver()
      .execute<FrinchisingViewModel[]>();

  readonly byId = async (id: string) =>
    new HttpClient(`${Paths.Franchises}/${id}`, 'GET')
      .withTimeout(10000)
      .withBearerAuthorization(this.token)
      .withJsonReviver()
      .execute<FrinchisingViewModel>();

  readonly addOrEdit = async (model: FrinchisingViewModel) =>
    // TODO: метод редактирования записи: если id пустой - создание, в противном случае редактирование
    new HttpClient(model.id ? Paths.Franchises : Paths.Franchises, 'POST')
      .withTimeout(10000)
      .withBearerAuthorization(this.token)
      .execute();
}
