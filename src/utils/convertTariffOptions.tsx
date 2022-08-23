import { TariffsType } from 'app/types/TariffTypes';
import { OptionT } from 'app/types/OptionT';

export const convertTariffOptions = (tariffs: TariffsType[]): OptionT[] =>
  tariffs.map(item => ({ value: item.id, label: item.name }));
