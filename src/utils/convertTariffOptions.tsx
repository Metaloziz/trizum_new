import { ResponseTariffType } from 'app/services/tariffsService';
import { Option } from 'components/select/CustomSelect';

export const convertTariffOptions = (tariffs: ResponseTariffType[]): Option[] =>
  tariffs.map(item => ({ value: item.id, label: item.name }));
