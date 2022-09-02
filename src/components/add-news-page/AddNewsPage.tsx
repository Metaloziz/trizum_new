import React, { useEffect, useState } from 'react';

import styles from './AddNewsPage.module.scss';
import Button from 'components/button/Button';
import RichTextEditor from 'components/rich-text/RichTextEditor';
import { CustomMultiSelect, StyledOption } from 'components/multiSelect/CustomMultiSelect';
import { convertEnumOptions } from 'utils/convertEnumOptions';
import { RoleNames } from 'app/enums/RoleNames';
import { TextField } from '@mui/material';
import testsStore from 'app/stores/testsStore';
import { getAllOptionsMUI } from 'utils/getOption';
import { convertTestOptions } from 'utils/convertTestOptions';
import articlesStore from 'app/stores/articlesStore';
import { Roles } from 'app/stores/appStore';
import slateStore from 'app/stores/slateStore';
import { observer } from 'mobx-react-lite';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ArticlePayloadT } from 'app/types/ArticlePayloadT';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from 'app/enums/AppRoutes';
import { ResultMessage } from 'components/add-news-page/ResultMessage/ResultMessage';

type ArticleFormT = {
  title: string;
  description: string;
  testId: string;
  roles: number[];
};

export type ArticleDescriptionType = {
  type: string;
  text: string;
};

const AddNewsPage = observer(() => {
  const { tests, setTests, setSearchParams } = testsStore;
  const { postArticle, isSuccessPost, article } = articlesStore;
  const { content } = slateStore;

  const [roles, setRoles] = useState<any>(['']);

  const rolesOptions = convertEnumOptions(RoleNames);
  const testOptions = convertTestOptions(tests);

  useEffect(() => {
    setSearchParams({ per_page: 1000 });
    setTests();
  }, []);

  const schema = yup.object().shape({
    title: yup.string().required('обязательно поле'),
    description: yup.string().required('обязательно поле'),
    testId: yup.string().required('обязательно поле'),
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ArticleFormT>({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const onReadTheoryClick = (): void => {
    navigate(`${AppRoutes.Blog}/${article.title}`);
  };

  const onSubmit = handleSubmit(data => {
    const description: ArticleDescriptionType = { type: 'description', text: data.description };

    content.push(description); // добавление описания вне редактора

    const newArticle: ArticlePayloadT = {
      title: data.title,
      content,
      testId: data.testId,
      status: 'active',
      forFranchisee: roles.includes(Roles.Franchisee),
      forFranchiseeAdmin: roles.includes(Roles.FranchiseeAdmin),
      forMethodist: roles.includes(Roles.Methodist),
      forStudents: roles.includes(Roles.Student),
      forTeachers: roles.includes(Roles.Teacher),
      forTeachersEducation: roles.includes(Roles.TeacherEducation),
      forTutor: roles.includes(Roles.Tutor),
    };
    postArticle(newArticle);
  });

  return (
    <div className={styles.content}>
      <div className={styles.innerContent}>
        <form>
          <h1>Добавление статьи</h1>
          <div className={styles.nameBlock}>
            <div className={styles.input}>
              <TextField
                {...register('title')}
                label="Заголовок"
                helperText={errors.title?.message}
                error={!!errors.title}
                defaultValue=""
                fullWidth
              />
            </div>
            <div className={styles.input}>
              <TextField
                {...register('description')}
                label="Описание статьи"
                helperText={errors.description?.message}
                error={!!errors.description}
                defaultValue=""
                multiline
                rows={3}
                fullWidth
              />
            </div>
            <div className={styles.test}>
              <TextField
                {...register('testId')}
                label="Тест"
                helperText={errors.testId?.message}
                error={!!errors.testId}
                defaultValue=""
                fullWidth
                select
              >
                {getAllOptionsMUI(testOptions)}
              </TextField>
            </div>

            <div className={styles.selectBlock}>
              <p>Доступно ролям:</p>

              <CustomMultiSelect value={roles} onChange={e => setRoles(e)}>
                {rolesOptions.map(({ value, label }) => (
                  <StyledOption key={value} value={value}>
                    {label}
                  </StyledOption>
                ))}
              </CustomMultiSelect>
            </div>
          </div>
          <div>
            <p>Текст статьи</p>
            <div className={styles.newsEditor}>
              <RichTextEditor />
            </div>
          </div>

          <ResultMessage successPost={isSuccessPost} onClick={onReadTheoryClick} />

          <div className={styles.error}>{isSuccessPost}</div>
          <div className={styles.newsBtn}>
            <Button onClick={onSubmit} disabled={isSubmitSuccessful}>
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default AddNewsPage;
