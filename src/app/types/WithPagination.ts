export type WithPagination<T = any> = {
  items: T;
  page: number;
  perPage: number;
  total: number;
};
