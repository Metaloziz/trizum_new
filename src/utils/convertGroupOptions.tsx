// import { GroupsItemsType } from 'app/types/GroupTypes';
import { Option } from 'components/select/CustomSelect';

export const convertGroupOptions = (groups: any[]): Option[] =>
  groups.map(item => ({ value: item.id, label: item.name }));
