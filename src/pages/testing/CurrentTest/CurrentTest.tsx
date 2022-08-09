import { FC, useEffect } from 'react';

import { observer } from 'mobx-react-lite';

import testsStore from 'app/stores/testsStore';
import TestPage from 'components/test-page';
import { addIdElements } from 'utils/addIdElements';

export const CurrentTest: FC = observer(() => {
  const { getTests, currentTest } = testsStore;

  useEffect(() => {
    getTests();
  }, []);

  const questions = addIdElements(currentTest.test.content);

  return (
    <div>
      <TestPage id={currentTest.test.id} title={currentTest.test.title} content={questions} />
    </div>
  );
});
