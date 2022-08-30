import React from 'react';
import { FieldErrors, useForm, UseFormRegisterReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { REG_NAME } from 'constants/regExp';
import { MAX_NAMES_LENGTH, MIN_NAMES_LENGTH } from 'constants/constants';
import TextField from '@mui/material/TextField';
import style from './TestEditForm.module.scss';
import Button from 'components/button/Button';

type TestInputType = {
  title: string;
  question: string;
  correctAnswer: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  answer5: string;
};

const NewComponent = (props: {
  register: UseFormRegisterReturn<string>;
  errors: FieldErrors<TestInputType>;
  register1: UseFormRegisterReturn<string>;
  register2: UseFormRegisterReturn<string>;
  register3: UseFormRegisterReturn<string>;
  register4: UseFormRegisterReturn<string>;
  register5: UseFormRegisterReturn<string>;
  register6: UseFormRegisterReturn<string>;
}) => (
  <div className={style.body}>
    <TextField
      {...props.register}
      helperText={props.errors.question?.message}
      error={!!props.errors?.question}
      label="Вопрос"
    />
    <TextField
      {...props.register1}
      helperText={props.errors.correctAnswer?.message}
      error={!!props.errors?.correctAnswer}
      label="Правильный ответ"
    />
    <TextField
      {...props.register2}
      helperText={props.errors.answer1?.message}
      error={!!props.errors?.answer1}
      label="Неверный вариант"
    />
    <TextField
      {...props.register3}
      helperText={props.errors.answer2?.message}
      error={!!props.errors?.answer2}
      label="Неверный вариант"
    />
    <TextField
      {...props.register4}
      helperText={props.errors.answer3?.message}
      error={!!props.errors?.answer3}
      label="Неверный вариант"
    />
    <TextField
      {...props.register5}
      helperText={props.errors.answer4?.message}
      error={!!props.errors?.answer4}
      label="Неверный вариант"
    />
    <TextField
      {...props.register6}
      helperText={props.errors.answer5?.message}
      error={!!props.errors?.answer5}
      label="Неверный вариант"
    />
  </div>
);

export const TestEditForm = () => {
  const inputRules = yup
    .string()
    .required('Обязательное поле')
    .matches(REG_NAME, 'допустима только кириллица')
    .max(MAX_NAMES_LENGTH, `максимальная длинна ${MAX_NAMES_LENGTH} символов`)
    .min(MIN_NAMES_LENGTH, `минимальная длинна ${MIN_NAMES_LENGTH} символа`);

  const schema = yup.object().shape({
    title: inputRules,
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
    clearErrors,
    setValue,
    watch,
    resetField,
    register,
    formState: { errors },
  } = useForm<TestInputType>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit(async values => {
    // eslint-disable-next-line no-alert
    alert(values);
  });

  return (
    <div className={style.container}>
      <h2>Добавить тест</h2>
      <form>
        <div className={style.body}>
          <TextField
            {...register('title')}
            helperText={errors.title?.message}
            error={!!errors?.title}
            label="Заголовок"
          />
        </div>
        <NewComponent
          register={register('question')}
          errors={errors}
          register1={register('correctAnswer')}
          register2={register('answer1')}
          register3={register('answer2')}
          register4={register('answer3')}
          register5={register('answer4')}
          register6={register('answer5')}
        />
        <NewComponent
          register={register('question')}
          errors={errors}
          register1={register('correctAnswer')}
          register2={register('answer1')}
          register3={register('answer2')}
          register4={register('answer3')}
          register5={register('answer4')}
          register6={register('answer5')}
        />
        <NewComponent
          register={register('question')}
          errors={errors}
          register1={register('correctAnswer')}
          register2={register('answer1')}
          register3={register('answer2')}
          register4={register('answer3')}
          register5={register('answer4')}
          register6={register('answer5')}
        />
        <NewComponent
          register={register('question')}
          errors={errors}
          register1={register('correctAnswer')}
          register2={register('answer1')}
          register3={register('answer2')}
          register4={register('answer3')}
          register5={register('answer4')}
          register6={register('answer5')}
        />
        <NewComponent
          register={register('question')}
          errors={errors}
          register1={register('correctAnswer')}
          register2={register('answer1')}
          register3={register('answer2')}
          register4={register('answer3')}
          register5={register('answer4')}
          register6={register('answer5')}
        />
        <div>
          <Button onClick={onSubmit}>Сохранить</Button>
        </div>
      </form>
    </div>
  );
};
