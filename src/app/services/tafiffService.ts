import { Paths } from '../enums/Paths';
import { TariffsType } from '../types/TariffTypes';

import instance from 'app/services/config';

const tariffsService = {
  getAllTariffs: async (): Promise<TariffsType[]> => {
    const { data } = await instance.get(Paths.Tariffs);
    return data;
  },
  create: async (options: TariffsType): Promise<any> => {
    const data = await instance.post(Paths.Tariffs, options);
    return data;
  },
  edit: async (id: string, options: any): Promise<any> => {
    const optionsEdit = {
      ...options,
      startedAt: new Date(options.startedAt.date),
      endedAt: new Date(options.endedAt.date),
    };
    const data = await instance.post(`${Paths.Tariffs}/${id}`, optionsEdit);
    return data;
  },
};

export default tariffsService;
