import { Paths } from '@app/enums/Paths';
import instance from '@app/services/config';
import { PresetT } from '@app/types/WorkTypes'

const worksService = {
  getPresets: async (): Promise<PresetT[]> => {
    const { data } = await instance.get(Paths.Presets);
    return data;
  },
};
export default worksService;
