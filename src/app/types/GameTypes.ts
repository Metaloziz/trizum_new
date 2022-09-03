export type ResponseGame = [string];
export type GameT = {
  code: string;
  name: string;
  type: string;
};

export type GamesT = Omit<GameT, 'code'>[];

export type PresetsGameSettings = {
  timeComplete: number;
  elementsTotal: number;
  levelMaxCompleted?: number;
  gameCode?: string;
  cycleTime?: number;
  wordsCount?: number;
  digitMax?: number;
  templateCode?: number;
  groupsCount?: [];
  blinksCount?: number;
  errorAcceptable?: number;
  speed?: number;
  rows?: number;
};

export type EditOrCreatePresetParamsT = {
  gameCode?: string;
  name: string;
  settings: PresetsGameSettings[];
  level?: string;
  status?: string;
};

export type CreatePresetResponseT = {
  time: number;
  levelMaxCompleted: number;
  gameCode: string;
  actionsSuccessfulCount: number;
  actions: number;
  templateCode: number;
  speed: number;
};

export type GamePresetT = {
  id: string;
  name: string;
  game: GameT;
  status: string;
  level: string;
  settings: PresetsGameSettings[];
};

export type OneGamePresent = {
  gamePreset: GamePresetT;
  usedInWorks: [];
};

export type GamePresetsResponseT = {
  items: Omit<GamePresetT, 'settings'>[];
  perPage: number;
  page: number;
  total: number;
};
