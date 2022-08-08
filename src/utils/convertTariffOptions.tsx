import { TariffsType } from 'app/types/TariffTypes';
import { Option } from 'components/select/CustomSelect';

export const convertTariffOptions = (tariffs: TariffsType[]): Option[] =>
  tariffs.map(item => ({ value: item.id, label: item.name }));
