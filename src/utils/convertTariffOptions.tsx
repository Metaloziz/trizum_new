import { TariffsType } from 'app/types/TariffTypes';
import { OptionT } from 'app/types/OptionT';

export const convertTariffOptions = (tariffs: TariffsType[]): OptionT[] => {
  const optionTariffs = tariffs.map(item => ({ value: item.id, label: item.name }));
  return [{ value: '', label: 'Не выбрано' }, ...optionTariffs];
};
