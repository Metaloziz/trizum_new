import { OptionT } from 'app/types/OptionT';
import { GroupLevels } from 'app/enums/GroupLevels';

export const convertLevelOptions = (): OptionT[] =>
  Object.values(GroupLevels).map(el => ({ label: el, value: el }));
