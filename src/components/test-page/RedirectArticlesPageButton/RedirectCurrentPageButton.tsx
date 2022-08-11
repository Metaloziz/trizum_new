import { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from 'components/button/Button';

type RedirectCurrentPageButtonPropsT = {
  title: string;
  rout: string;
};

export const RedirectCurrentPageButton: FC<RedirectCurrentPageButtonPropsT> = ({ rout, title }) => {
  const navigate = useNavigate();

  const handleArticlePage = () => {
    navigate(rout);
  };

  return <Button onClick={handleArticlePage}>{title}</Button>;
};
