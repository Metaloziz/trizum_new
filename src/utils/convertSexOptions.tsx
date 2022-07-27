import { SexEnum } from 'app/enums/CommonEnums';
import { FranchisingViewModel } from 'app/viewModels/FranchisingViewModel';
import { Option } from 'components/select/CustomSelect';

export const convertSexOptions = (): Option[] =>
  Object.values(SexEnum).map(el => ({ label: el, value: el }));
