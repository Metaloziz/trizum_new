import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import {
  EditOrCreatePresetParamsT,
  GamePresetsResponseT,
  GamePresetT,
  GameT,
} from 'app/types/GameTypes';

const gamesService = {
  getPresets: async (): Promise<GamePresetsResponseT> => {
    const { data } = await instance.get(`${Paths.Presets}?per_page=30`);
    return data;
  },
  getPreset: async (id: string) => {
    const { data } = await instance.get(`${Paths.Presets}/${id}`);
    return data;
  },
  getGame: async (game: string): Promise<GameT> => {
    const { data } = await instance.get(`${Paths.Games}/${game}`);
    return data;
  },
  getGames: async () => {
    const { data } = await instance.get(Paths.Games);
    return data;
  },
  createPresentGame: async (params: EditOrCreatePresetParamsT): Promise<GamePresetT> => {
    const { data } = await instance.post(Paths.Presets, params);
    return data;
  },
  editPresetGame: async (id: string, params: EditOrCreatePresetParamsT): Promise<GamePresetT> => {
    const { data } = await instance.post(`${Paths.Presets}/${id}`, params);
    return data;
  },
};
export default gamesService;
