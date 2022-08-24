import { OptionT } from 'app/types/OptionT';
import { GroupLevels } from 'app/enums/GroupLevels';

export const convertLevelOptions = (): OptionT[] => {
  const keys = Object.keys(GroupLevels);

  return Object.values(GroupLevels).map((el, index) => ({ label: el, value: keys[index] }));
};
