import { Paths } from '../enums/Paths';
import { TariffsType } from '../types/TariffTypes';

import instance from 'app/services/config';

const tariffsService = {
  getAllTariffs: async (): Promise<TariffsType[]> => {
    const { data } = await instance.get(Paths.Tariffs);
    return data;
  },
};

export default tariffsService;
