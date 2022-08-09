export const findIndexElement = (array: any[], elementId: number): number =>
  array.findIndex(el => el.id === elementId);

type ObjectType = {
  id: number;
};
export const findElement = <T>(array: (T & ObjectType)[], elementId: number): T =>
  array.find(({ id }) => id === elementId)!;
