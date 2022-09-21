export const translateStatus = (status: string | null) => {
  if (status === 'easy') {
    status = 'Лёгкий';
  } else if (status === 'medium') {
    status = 'Средний';
  } else if (status === 'hard') {
    status = 'Сложный';
  }
  return status;
};
