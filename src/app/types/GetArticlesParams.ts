import { WithPagination } from 'app/types/WithPagination';

export type GetArticlesParams = Partial<Pick<WithPagination, 'page' | 'perPage'>>;
