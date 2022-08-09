import { IdType } from 'app/types/IdType';

export const findIndexElement = (array: any[], elementId: number): number =>
  array.findIndex(el => el.id === elementId);

export const findElement = <T>(array: (T & IdType)[], elementId: number): T =>
  array.find(({ id }) => id === elementId)!;
