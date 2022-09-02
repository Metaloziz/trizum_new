import { OptionT } from 'app/types/OptionT';
import { PreviewTestT } from 'app/types/TestsT';

export const convertTestOptions = (tests: PreviewTestT[]): OptionT[] =>
  tests.map(item => ({ value: item.id!, label: item.title }));
