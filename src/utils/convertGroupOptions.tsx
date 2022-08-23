// import { GroupsItemsType } from 'app/types/GroupTypes';
import { OptionT } from 'app/types/OptionT';

export const convertGroupOptions = (groups: any[]): OptionT[] =>
  groups.map(item => ({ value: item.id, label: item.name }));
