export type TariffsType = {
  id: string;
  name: string;
  code: string;
  description: string;
  forFirstPay: boolean;
  forNewClient: boolean;
  forSecondChild: boolean;
  newPrice: string;
  oldPrice: string;
  prevTariff: string;
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
