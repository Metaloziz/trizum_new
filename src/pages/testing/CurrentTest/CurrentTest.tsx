import { FC, useEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import testsStore from 'app/stores/testsStore';
import TestPage from 'components/test-page';

export const CurrentTest: FC = observer(() => {
  const { tests, getTests, getOneTest } = testsStore;
  const { id } = useParams();

  useEffect(() => {
    getTests();
  }, []);

  return (
    <div>
      <TestPage />
    </div>
  );
});
