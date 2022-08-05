import { FranchisingViewModel } from 'app/viewModels/FranchisingViewModel';
import { Option } from 'components/select/CustomSelect';

export const convertFranchiseeOptions = (franchisees: FranchisingViewModel[]): Option[] =>
  franchisees.map(item => ({ value: item.id!, label: item.shortName }));
