import { Paths } from 'app/enums/Paths';
import { HttpClient } from 'app/rest/HttpClient';
import tokenService from 'app/services/tokenService';
import { FranchisingViewModel } from 'app/viewModels/FranchisingViewModel';

export class FranchisingRepository {
  private readonly token = tokenService.getLocalAccessToken();

  readonly list = async () =>
    new HttpClient(Paths.Franchises, 'GET')
      .withTimeout(10000)
      .withBearerAuthorization(this.token)
      .withJsonReviver()
      .execute<FranchisingViewModel[]>();

  readonly byId = async (id: string) =>
    new HttpClient(`${Paths.Franchises}/${id}`, 'GET')
      .withTimeout(10000)
      .withBearerAuthorization(this.token)
      .withJsonReviver()
      .execute<FranchisingViewModel>();

  readonly addOrEdit = async (model: FranchisingViewModel) =>
    new HttpClient(model.id ? `${Paths.Franchises}/${model.id}` : Paths.Franchises, 'POST')
      .withTimeout(10000)
      .withBearerAuthorization(this.token)
      .withJsonRequest(model)
      .execute();

  readonly remove = async (id: string) =>
    new HttpClient(`${Paths.Franchises}/${id}`, 'DELETE')
      .withTimeout(10000)
      .withBearerAuthorization(this.token)
      .execute();
}
