import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import { RequestCreateFranchise, ResponseFranchise } from 'app/types/FranchiseTypes';
import { FranchisingViewModel } from 'app/viewModels/FranchisingViewModel';

export type ResponseTariffType = {
  // возможны изменения типа
  id: string;
  name: string;
  status: string;
  startedAt: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
  endedAt: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
  prevTariff: null;
  oldPrice: string;
  newPrice: string;
  code: string;
  description: string;
  forSecondChild: boolean;
  forNewClient: boolean;
  forFirstPay: boolean;
  durationMonths: number;
};

const tariffsService = {
  getAll: async (): Promise<ResponseTariffType[]> => {
    const { data } = await instance.get(Paths.Tariffs);
    return data;
  },
};

export default tariffsService;
