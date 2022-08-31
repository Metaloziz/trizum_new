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
import { ArticlePayloadT } from 'app/services/articlesService';
import { Roles } from 'app/stores/appStore';
import slateStore from 'app/stores/slateStore';
import { observer } from 'mobx-react-lite';

const AddNewsPage = observer(() => {
  const { tests, setTests } = testsStore;
  const { postArticle, isSuccess } = articlesStore;
  const { content } = slateStore;

  console.log(isSuccess); // todo without any validation

  const [title, setTitle] = useState<string>('');
  const [roles, setRoles] = useState<any>(['']);
  const [testId, setTestId] = useState('');

  const rolesOptions = convertEnumOptions(RoleNames);
  const testOptions = convertTestOptions(tests);

  useEffect(() => {
    setTests();
  }, []);

  const setNewArticle = () => {
    const newArticle: ArticlePayloadT = {
      title,
      content,
      testId,
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
  };

  return (
    <div className={styles.content}>
      <div className={styles.innerContent}>
        <h1>Добавление статьи</h1>
        <div className={styles.nameBlock}>
          <div className={styles.input}>
            <TextField
              value={title}
              label="Заголовок"
              defaultValue=""
              fullWidth
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.test}>
            <TextField
              label="Тест"
              select
              fullWidth
              defaultValue=""
              onChange={e => setTestId(e.target.value)}
            >
              {getAllOptionsMUI(testOptions)}
            </TextField>
          </div>

          <div className={styles.selectBlock}>
            <p>Доступно ролям:</p>

            <CustomMultiSelect defaultValue={[0]} value={roles} onChange={e => setRoles(e)}>
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
        <div className={styles.newsBtn}>
          <Button onClick={setNewArticle}>Сохранить</Button>
        </div>
      </div>
    </div>
  );
});

export default AddNewsPage;
