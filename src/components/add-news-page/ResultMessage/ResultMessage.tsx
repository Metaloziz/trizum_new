import styles from 'components/add-news-page/AddNewsPage.module.scss';
import Button from 'components/button/Button';
import React, { FC } from 'react';

type Props = { successPost: null | boolean; onClick: () => void };

export const ResultMessage: FC<Props> = ({ onClick, successPost }) => (
  <>
    {typeof successPost === 'boolean' &&
      (successPost ? (
        <>
          <div className={styles.success}>Статья создана</div>
          <Button onClick={onClick} type="button">
            Посмотреть статью
          </Button>
        </>
      ) : (
        <div className={styles.error}>Ошибка: Статья не создана</div>
      ))}
  </>
);
