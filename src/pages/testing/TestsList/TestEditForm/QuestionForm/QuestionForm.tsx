import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import React, { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'components/button/Button';
import * as yup from 'yup';
import { MAX_TEST_QUESTION_LENGTH, MIN_NAMES_LENGTH } from 'constants/constants';
import style from './QuestionForm.module.scss';

export class QuestionFormData {
  question = 'Вопрос';

  correctAnswer = 'Правильный ответ';

  answer1 = 'Не правильный ответ';

  answer2 = 'Не правильный ответ';

  answer3 = 'Не правильный ответ';

  answer4 = 'Не правильный ответ';

  answer5 = 'Не правильный ответ';
}

type Props = {
  getQuestionFormData: (data: QuestionFormData) => void;
};

export const QuestionForm: FC<Props> = ({ getQuestionFormData }) => {
  const inputRules = yup
    .string()
    .required('Обязательное поле')
    .max(MAX_TEST_QUESTION_LENGTH, `максимальная длинна ${MAX_TEST_QUESTION_LENGTH} символов`)
    .min(MIN_NAMES_LENGTH, `минимальная длинна ${MIN_NAMES_LENGTH} символа`);

  const schema = yup.object().shape({
    question: inputRules,
    correctAnswer: inputRules,
    answer1: inputRules,
    answer2: inputRules,
    answer3: inputRules,
    answer4: inputRules,
    answer5: inputRules,
  });

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<QuestionFormData>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit(values => {
    getQuestionFormData(values);
    reset();
  });

  const newObjectForm = new QuestionFormData();

  return (
    <div className={style.container}>
      <h2>Добавить вопрос</h2>
      <form>
        {Object.keys(newObjectForm).map(el => {
          const key = el as keyof QuestionFormData;

          return (
            <TextField
              {...register(key)}
              key={key}
              helperText={errors[key]?.message}
              error={!!errors[key]}
              label={newObjectForm[key]}
            />
          );
        })}
        <Button onClick={onSubmit}>Добавить</Button>
      </form>
    </div>
  );
};
