import { BASE_URL } from 'constants/constants';
import { ArticleImageType } from 'app/types/ArticleImageType/ArticleImageType';
import image from 'assets/images/teacher.svg';

export const findPictureUrl = (array: any): string => {
  const result: ArticleImageType | undefined = array.find(
    (el: { type: string }) => el?.type === 'picture',
  );

  if (result) {
    return `${BASE_URL}${result.path}`;
  }
  return image;
};
