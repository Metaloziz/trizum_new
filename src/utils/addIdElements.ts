import { IdType } from 'app/types/IdType';

export const addIdElements = <T>(array: T[]): (T & IdType)[] =>
  array.map((element, index) => ({ ...element, id: (index + 1).toString() }));
