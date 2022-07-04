import { WorkTypes } from 'app/enums/WorkTypes';

export type PresetT = { gameId: string; id: string; name: string };

export type RequestCreateWork = {
  type: WorkTypes.HW;
  title: string;
  text: string;
  tests?: string[];
  gamePresets?: string[];
};
