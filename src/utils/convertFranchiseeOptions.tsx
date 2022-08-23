import { FranchisingViewModel } from 'app/viewModels/FranchisingViewModel';
import { OptionT } from 'app/types/OptionT';

export const convertFranchiseeOptions = (franchisees: FranchisingViewModel[]): OptionT[] =>
  franchisees.map(item => ({ value: item.id!, label: item.shortName }));
