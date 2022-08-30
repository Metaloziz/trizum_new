export const convertDateView = (date: string) => {
  // todo for filter
  const draft = date.slice(0, 16).split(' '); // 16 это индекс последней минуты

  draft[0] = draft[0].replaceAll('-', '/').split('/').reverse().join('/');

  return draft.join(' ');
};
