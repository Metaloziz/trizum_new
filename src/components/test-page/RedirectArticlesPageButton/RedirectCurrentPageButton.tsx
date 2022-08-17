import { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import Button, { ButtonPropsT } from 'components/button/Button';

type RedirectCurrentPageButtonPropsT = {
  title: string;
  rout: string;
} & ButtonPropsT;

export const RedirectCurrentPageButton: FC<RedirectCurrentPageButtonPropsT> = ({
  rout,
  title,
  ...rest
}) => {
  const navigate = useNavigate();

  const handleArticlePage = () => {
    navigate(rout);
  };

  return (
    <Button onClick={handleArticlePage} {...rest}>
      {title}
    </Button>
  );
};
