import { FullResponseFranchise } from 'app/types/FranchiseTypes';
import { ResponseUserT } from 'app/types/UserTypes';

export type ResponseGroups = { id: string; code: string; franchise: string };

export type ResponseOneGroup = {
  id: string;
  code: string;
  franchise: FullResponseFranchise;
  users: [
    {
      id: string;
      stats: any[];
      user: ResponseUserT;
    },
  ];
};
