import { MockArticleT } from 'components/blog-page/data/blogsPreviews';
import { findElement } from 'utils/findIndexElement';

let articles: MockArticleT[];

const currentArticleId = 3;

beforeEach(() => {
  articles = [
    { id: 1, img: '1', text: 'qwe', title: 'qweqwe' },
    { id: 2, img: '2', text: 'qweqwe', title: 'qweqwe' },
    { id: currentArticleId, img: '3', text: 'qweqweqwe', title: 'qweqweqwe' },
    { id: 4, img: '4', text: 'qweqweqweqwe', title: 'qweqweqweqwe' },
  ];
});

describe('utils', () => {
  test('find element', () => {
    const article = findElement(articles, currentArticleId);

    const result = articles.find(item => item.id === article.id);

    expect(result?.id).toBe(currentArticleId);
  });
});
