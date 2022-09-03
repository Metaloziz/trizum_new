import { PresetT } from 'app/types/WorkTypes';
import { makeAutoObservable, runInAction } from 'mobx';

import gamesService from 'app/services/gamesService';
import worksService from 'app/services/worksService';
import {
  EditOrCreatePresetParamsT,
  GamePresetsResponseT,
  GamePresetT,
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

  actualPreset: Omit<GamePresetT, 'settings'>[] = [];

  games: ResponseGame[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getGame = async (game: string) => {
    try {
      const res = await gamesService.getGame(game);
      runInAction(() => {
        this.game = res;
        this.filterPresets(res.code);
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
    try {
      const res = await worksService.getPresets();
      runInAction(() => {
        this.presets = res;
      });
    } catch (e) {
      console.warn(e);
    }
  };

  getsPresets = async () => {
    const res = await gamesService.getPresets();
    runInAction(() => {
      this.newPresets = res;
    });
  };

  filterPresets = (code: string) => {
    try {
      runInAction(() => {
        this.actualPreset = this.newPresets.items.filter(pr => pr.game.code === code);
      });
    } catch (e) {
      console.warn(e);
    }
  };

  getPreset = async (presetName: string) => {
    try {
      const preset = this.newPresets.items.filter(el => el.name === presetName);
      if (preset.length) {
        const res = await gamesService.getPreset(preset[0].id);
        runInAction(() => {
          this.gamePreset = res;
        });
      } else {
        this.gamePreset = {
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
      }
    } catch (e) {
      console.warn(e);
    }
  };

  createPresets = async (params: EditOrCreatePresetParamsT) => {
    await gamesService.createPresentGame(params);
    await this.getsPresets();
  };

  editPreset = async (params: EditOrCreatePresetParamsT) => {
    await gamesService.editPresetGame(this.gamePreset.gamePreset.id, params);
    await this.getsPresets();
  };
}

export default new GamesStore();
