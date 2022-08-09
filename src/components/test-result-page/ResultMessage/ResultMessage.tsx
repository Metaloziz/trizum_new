import { FC } from 'react';

import { OneTestT } from 'app/types/TestsT';

type ResultMessagePropsT = {
  result: number;
  currentTest: OneTestT;
};

export const ResultMessage: FC<ResultMessagePropsT> = ({ result, currentTest }) => {
  switch (result) {
    case 1:
      return <span>{`${result} правильный ответ из ${currentTest.test.content.length}`}</span>;
    case 2:
    case 3:
    case 4:
      return <span>{`${result} правильных ответа из ${currentTest.test.content.length}`}</span>;

    default:
      return <span>{`${result} правильных ответов из ${currentTest.test.content.length}`}</span>;
  }
};
