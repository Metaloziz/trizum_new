import { SexEnum } from 'app/enums/CommonEnums';
import { OptionT } from 'app/types/OptionT';

export const convertSexOptions = (): OptionT[] =>
  Object.values(SexEnum).map(el => ({ label: el, value: el }));
