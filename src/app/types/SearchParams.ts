import { WithPagination } from 'app/types/WithPagination';
import { StatusT } from 'app/types/StatusT';

export type SearchParams = Partial<Pick<WithPagination, 'page' | 'perPage'> & { status: StatusT }>;
