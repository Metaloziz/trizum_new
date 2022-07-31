export type WithPagination<T> = {
  items: T;
  page: number;
  perPage: number;
  total: number;
};
