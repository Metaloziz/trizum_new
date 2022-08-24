import { Paths } from '../enums/Paths';
import { TariffsEditOrCreateT, TariffsType } from '../types/TariffTypes';

import instance from 'app/services/config';

const tariffsService = {
  getAllTariffs: async (): Promise<TariffsType[]> => {
    const { data } = await instance.get(Paths.Tariffs);
    return data;
  },
  create: async (options: TariffsEditOrCreateT): Promise<TariffsType> => {
    const { data } = await instance.post(Paths.Tariffs, options);
    return data;
  },
  edit: async (id: string, options: TariffsEditOrCreateT): Promise<TariffsType> => {
    const { data } = await instance.post(`${Paths.Tariffs}/${id}`, options);
    return data;
  },
};

export default tariffsService;
