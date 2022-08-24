export type TariffsType = {
  id: string;
  name: string;
  code: string;
  description: string;
  forFirstPay: boolean;
  forNewClient: boolean;
  forSecondChild: boolean;
  newPrice: string;
  durationMonths: number;
  oldPrice: string;
  prevTariff: number | null;
  startedAt: {
    date: string;
    timezone: string;
    timezone_type: number;
  };
  endedAt: {
    date: string;
    timezone: string;
    timezone_type: number;
  };
  status: string;
};

export type TariffsEditOrCreateT = {
  name: string;
  status: string;
  startedAt: string | null;
  endedAt: string | null;
  oldPrice?: string | null;
  newPrice: string;
  code: string;
  description: string;
  forSecondChild: boolean;
  forNewClient: boolean;
  forFirstPay: boolean;
  durationMonths: number;
};
