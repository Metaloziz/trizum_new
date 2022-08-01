import { FranchisingViewModel } from 'app/viewModels/FranchisingViewModel';

export type FranchisingFilterViewModel = Pick<
  FranchisingViewModel,
  'checkingAccount' | 'phone' | 'shortName' | 'email' | 'inn' | 'city'
>;
