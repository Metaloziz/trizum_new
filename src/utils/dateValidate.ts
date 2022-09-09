export const dateValidate = (value: string): boolean => {
  let result = false;
  const dateArr = value.split('.');
  if (dateArr[2] && Number(dateArr[2]) >= Number('1920')) {
    result = true;
  }
  return result;
};
