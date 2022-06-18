import { Paths } from '@app/enums/Paths';
import instance from '@app/services/config';
import { RequestCreateFranchise, ResponseFranchise } from '@app/types/FranchiseTypes';

const franchiseService = {
  getAll: async (): Promise<ResponseFranchise[]> => {
    const { data } = await instance.get(Paths.Franchises);
    return data;
  },
  getOne: async (id: string): Promise<ResponseFranchise> => {
    const { data } = await instance.get(`${Paths.Franchises}/${id}`);
    return data;
  },
  create: async (options: RequestCreateFranchise): Promise<ResponseFranchise> => {
    const { data } = await instance.post(Paths.Franchises, options);
    return data;
  },
};

export default franchiseService;
