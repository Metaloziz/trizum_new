import { ArticleDescriptionType } from 'app/types/ArticleDescriptionType';

export const findDescription = (array: any): ArticleDescriptionType => {
  const result: ArticleDescriptionType | undefined = array.find(
    (el: { type: string }) => el?.type === 'description',
  );

  if (result) {
    return result;
  }
  return { text: 'default', type: '' };
};
