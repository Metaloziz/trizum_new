export const removeEmptyFields = (obj: any) => {
  const result: any = {};

  Object.keys(obj).forEach(key => {
    if (obj[key]) {
      result[key] = obj[key];
    }
  });
  return result;
};
