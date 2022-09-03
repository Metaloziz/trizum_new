import { PresetT } from 'app/types/WorkTypes';
import { makeAutoObservable, runInAction } from 'mobx';

import gamesService from 'app/services/gamesService';
import worksService from 'app/services/worksService';
import {
  EditOrCreatePresetParamsT,
  GamePresetsResponseT,
  GameT,
  OneGamePresent,
  ResponseGame,
} from 'app/types/GameTypes';

class GamesStore {
  presets: PresetT[] = [];

  newPresets: GamePresetsResponseT = {
    items: [],
    perPage: 0,
    page: 0,
    total: 0,
  };

  gamePreset: OneGamePresent = {
    gamePreset: {
      id: '',
      name: '',
      game: {
        code: '',
        name: '',
        type: '',
      },
      status: '',
      level: '',
      settings: [],
    },
    usedInWorks: [],
  };

  game: GameT = {
    code: '',
    type: '',
    name: '',
  };

  games: ResponseGame[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getGame = async (game: string) => {
    try {
      const res = await gamesService.getGame(game);
      runInAction(() => {
        this.game = res;
      });
    } catch (e) {
      console.log(e);
    }
  };

  getGames = async () => {
    try {
      const res = await gamesService.getGames();
      runInAction(() => {
        this.games = res;
      });
    } catch (e) {
      console.log(e);
    }
  };

  getPresets = async () => {
    const res = await worksService.getPresets();
    runInAction(() => {
      this.presets = res;
    });
  };

  getsPresets = async () => {
    const res = await gamesService.getPresets();
    runInAction(() => {
      this.newPresets = res;
    });
  };

  getPreset = async (presetName: string) => {
    try {
      const preset = this.newPresets.items.filter(el => el.name === presetName);
      const res = await gamesService.getPreset(preset[0].id);
      runInAction(() => {
        this.gamePreset = res;
      });
    } catch (e) {
      console.log(e);
    }
  };

  createPresets = async (params: EditOrCreatePresetParamsT) => {
    const res = await gamesService.createPresentGame(params);
    this.getsPresets();
  };

  editPreset = async (params: EditOrCreatePresetParamsT) => {
    const res = await gamesService.editPresetGame(this.gamePreset.gamePreset.id, params);
    this.getsPresets();
  };
}

export default new GamesStore();
