import { FC } from 'react';

import { useParams } from 'react-router-dom';

export const CurrentTest: FC = () => {
  const { id } = useParams();

  return <div>{`CurrentTest - ${id}`}</div>;
};
