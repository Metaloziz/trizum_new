import { ResponseUserT } from 'app/types/UserTypes';

export type UpdateUserPayloadT = Omit<Partial<ResponseUserT>, 'id'>;
