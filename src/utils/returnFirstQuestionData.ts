import { IdType } from 'app/types/IdType';
import { ContentT } from 'app/types/TestsT';
import { addIdElements } from 'utils/addIdElements';
import { FIRST_ARRAY_ITEM } from 'utils/consts/consts';

export type LocalContentT = ContentT & IdType;

export const returnFirstQuestionData = (array: ContentT[]): LocalContentT => {
  const questions = addIdElements(array);

  return questions[FIRST_ARRAY_ITEM];
};
