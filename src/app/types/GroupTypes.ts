// export type ResponseGroups = { id: string; code: string; franchise: string }; // todo I CAN
//
// export type ResponseOneGroup = {
//   id: string;
//   code: string;
//   franchise: FullResponseFranchise;
//   users: [
//     {
//       id: string;
//       stats: any[];
//       user: ResponseUserT;
//     },
//   ];
// };

/// //////////////////////////////////// NEW GROUPS TYPE

export type GroupsItemsType = {
  id: string;
  name: string;
  course: string;
  franchise: string;
};

export type ResponseGroupsType = {
  items: GroupsItemsType[];
  page: number;
  perPage: number;
  total: number;
};

export type ResponseGroupType = {
  id: string;
  name: string;
  course: any; // todo нужно уточнить
  franchise: any;
  users: [];
};
