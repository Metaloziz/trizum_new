import { useNavigate } from 'react-router-dom';

import { AppRoutes } from 'app/enums/AppRoutes';
import Button from 'components/button/Button';

export const RedirectArticlesPageButton = () => {
  const navigate = useNavigate();

  const handleArticlePage = () => {
    navigate(AppRoutes.Blog);
  };

  return <Button onClick={handleArticlePage}>К списку статей</Button>;
};
