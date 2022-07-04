import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import { PresetT, RequestCreateWork } from 'app/types/WorkTypes';

const worksService = {
  getPresets: async (): Promise<PresetT[]> => {
    const { data } = await instance.get(Paths.Presets);
    return data;
  },
  createWork: async (options: RequestCreateWork): Promise<any> => {
    const { data } = await instance.post(Paths.Works, options);
    return data;
  },
  editWork: async (options: RequestCreateWork, id: string): Promise<any> => {
    const { data } = await instance.post(`${Paths.Works}/${id}`, options);
    return data;
  },
  deleteWork: async (id: string): Promise<any> => {
    const { data } = await instance.delete(`${Paths.Works}/${id}`);
    return data;
  },
};
export default worksService;
