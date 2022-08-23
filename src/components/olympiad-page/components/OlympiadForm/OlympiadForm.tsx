import Button from 'components/button/Button';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

import style from './OlympiadForm.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { REG_NAME } from 'constants/regExp';
import { MAX_NAMES_LENGTH, MIN_NAMES_LENGTH } from 'constants/constants';
import MenuItem from '@mui/material/MenuItem';
import franchiseeStore from 'app/stores/franchiseeStore';
import { convertFranchiseeOptions } from 'utils/convertFranchiseeOptions';
import { observer } from 'mobx-react-lite';
import coursesStore from 'app/stores/coursesStore';
import { convertCourseOptions } from 'utils/convertCourseOptions';
import { GroupLevels } from 'app/enums/GroupLevels';
import { GroupTypes } from 'app/enums/GroupTypes';
import { StatusTypes } from 'app/enums/StatusTypes';
import { convertLevelOptions } from 'utils/convertLevelOptions';

type OlympiadPayloadType = {
  name: string;
  dateSince: string;
  dateUntil: string;
  franchiseId: string;
  courseId: string;
  level?: keyof typeof GroupLevels;
};

export const OlympiadForm = observer(() => {
  const { franchise } = franchiseeStore;
  const { courses } = coursesStore;

  const franchiseOptions = convertFranchiseeOptions(franchise);
  const courseOptions = convertCourseOptions(courses);
  const levelOptions = convertLevelOptions();

  const [franchiseId, setFranchiseId] = useState('');
  const [courseId, setCourseId] = useState('');

  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Обязательное поле')
      .matches(REG_NAME, 'допустима только кириллица')
      .max(MAX_NAMES_LENGTH, `максимальная длинна ${MAX_NAMES_LENGTH} символов`)
      .min(MIN_NAMES_LENGTH, `минимальная длинна ${MIN_NAMES_LENGTH} символа`),
    dateSince: yup.string().required('Обязательное поле'), // todo проверить после добавления dataPicker
    dateUntil: yup.string().required('Обязательное поле'), // todo проверить после добавления dataPicker
    franchiseId: yup.string().required('Обязательное поле'),
    courseId: yup.string().required('Обязательное поле'),
    level: yup.string().required('Обязательное поле'),
    // teacherId: yup.object().required('Обязательное поле'),
    // status: yup.object().required('Обязательное поле'),
  });

  const {
    handleSubmit,
    control,
    setError,
    resetField,
    reset,
    register,
    formState: { errors, isSubmitSuccessful },
  } = useForm<OlympiadPayloadType>({ resolver: yupResolver(schema), mode: 'onChange' });

  const onSubmit = handleSubmit(async values => {
    console.log(values);
  });

  console.log(errors);

  return (
    <form>
      <div className={style.modalOlympiad}>
        <h2>Добавление олимпиады</h2>
        <div className={style.modalName}>
          <TextField
            {...register('name')}
            helperText={errors.name?.message}
            error={!!errors?.name}
            label="Название олимпиады"
            style={{ width: '400px' }}
          />
        </div>

        <div className={style.modalSelect}>
          <div>
            <div className={style.selectBlock}>
              <TextField
                {...register('dateSince')}
                helperText={errors.dateSince?.message}
                error={!!errors?.dateSince}
                value="01.11.23"
                label="Дата начала"
              />
            </div>
            <div className={style.selectBlock}>
              <TextField
                {...register('franchiseId')}
                label="Франшиза"
                select
                defaultValue=""
                helperText={errors.franchiseId?.message}
                error={!!errors?.franchiseId}
              >
                {franchiseOptions.map(({ label, value }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className={style.selectBlock}>
              <TextField
                {...register('courseId')}
                select
                label="Курс"
                defaultValue=""
                helperText={errors.courseId?.message}
                error={!!errors?.courseId}
              >
                {courseOptions.map(({ label, value }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
          <div>
            <div className={style.selectBlock}>
              <TextField
                {...register('dateUntil')}
                helperText={errors.dateUntil?.message}
                error={!!errors?.dateUntil}
                value="01.11.24"
                label="Дата конца"
              />
            </div>
            <div className={style.selectBlock}>
              <TextField
                {...register('level')}
                select
                label="Уровень"
                defaultValue=""
                helperText={errors.level?.message}
                error={!!errors?.level}
              >
                {levelOptions.map(({ label, value }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
        </div>
        <div className={style.saveBtn}>
          <Button onClick={onSubmit}>Сохранить</Button>
        </div>
      </div>
    </form>
  );
});
