export type PaginationResponse<T> = {
  page: number;
  total: number;
  perPage: number;
  items: T[];
};
