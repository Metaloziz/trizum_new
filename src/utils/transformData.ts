export const transformDate = (date: string) => {
  if (date) {
    return new Date(date).toLocaleDateString();
  }
  return '';
};

export const shortenName = (name: string) => {
  if (name) {
    return name[0].toUpperCase();
  }
  return '';
};
