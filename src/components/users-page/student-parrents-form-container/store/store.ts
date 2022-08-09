import { ParentT } from 'app/types/UserTypes';

export type ParentsFormStateType = {
  id: number;
  isSuccessSubmit: boolean;
  isMain: boolean;
  parent?: ParentT;
};

export const MAX_PARENTS_COUNT = 3;
export const MAIN_PARENT_ID = 1;

export const INITIAL_PARENT_FORM_STATE: ParentsFormStateType[] = [
  {
    id: MAIN_PARENT_ID,
    isSuccessSubmit: false,
    isMain: true,
  },
];

export const setInitialState = (parents?: ParentT[]): ParentsFormStateType[] => {
  if (parents) {
    return parents.map((parent, index) => ({
      id: index + 1,
      isSuccessSubmit: true,
      isMain: parent.isMain,
      parent,
    }));
  }
  return INITIAL_PARENT_FORM_STATE;
};
