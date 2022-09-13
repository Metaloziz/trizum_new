import { OptionT } from 'app/types/OptionT';

export const convertEnumOptions = (enumObject: { [key: string]: string }): OptionT[] => {
  const keys: string[] = Object.keys(enumObject);
  const enumOptions = Object.values(enumObject).map((el, index) => ({
    label: el,
    value: keys[index],
  }));
  // return Object.values(enumObject).map((el, index) => ({
  //     label: el,
  //     value: keys[index],
  // }));
  return [{ value: '', label: 'Не выбрано' }, ...enumOptions];
};
