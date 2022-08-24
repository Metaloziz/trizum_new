import Button from 'components/button/Button';
import React, { FC, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

import style from './OlympiadForm.module.scss';
import { useForm } from 'react-hook-form';
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
import { convertLevelOptions } from 'utils/convertLevelOptions';
import groupsService from 'app/services/groupsService';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { OlympiadPayloadType } from 'app/types/OlympiadPayloadType';
import groupStore from 'app/stores/groupStore';
import { convertGroupOptions } from 'utils/convertGroupOptions';

type UseFormType = Omit<OlympiadPayloadType, 'type'>;

type Props = {
  setShowModal: (value: boolean) => void;
};

export const OlympiadForm: FC<Props> = observer(({ setShowModal }) => {
  const { franchise } = franchiseeStore;
  const { courses } = coursesStore;
  const { groups, getGroupsWithParams } = groupStore;

  const franchiseOptions = convertFranchiseeOptions(franchise);
  const courseOptions = convertCourseOptions(courses);
  const levelOptions = convertLevelOptions();
  const groupsOptions = convertGroupOptions(groups);

  const [errorMessage, setErrorMessage] = useState('');
  const [dateSince, setDateSince] = useState<string | null>(null);
  const [dateUntil, setDateUntil] = useState<string | null>(null);

  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Обязательное поле')
      .matches(REG_NAME, 'допустима только кириллица')
      .max(MAX_NAMES_LENGTH, `максимальная длинна ${MAX_NAMES_LENGTH} символов`)
      .min(MIN_NAMES_LENGTH, `минимальная длинна ${MIN_NAMES_LENGTH} символа`),
    dateSince: yup.string().required('Обязательное поле'),
    dateUntil: yup.string().required('Обязательное поле'),
    franchiseId: yup.string().required('Обязательное поле'),
    courseId: yup.string().required('Обязательное поле'),
    forGroupId: yup.string().required('Обязательное поле'),
    level: yup.string().required('Обязательное поле'),
  });

  const {
    handleSubmit,
    clearErrors,
    setValue,
    watch,
    resetField,
    register,
    formState: { errors },
  } = useForm<UseFormType>({ resolver: yupResolver(schema) });

  const franchiseIdData = watch('franchiseId');

  useEffect(() => {
    if (franchiseIdData) {
      const result = getGroupsWithParams({ franchiseId: franchiseIdData, type: 'class' });
      resetField('forGroupId');
    }
  }, [franchiseIdData]);

  const onSubmit = handleSubmit(async values => {
    const response = await groupsService.addOlympiadGroup({ ...values, type: 'olympiad' });

    if (response?.error) {
      setErrorMessage(response.error);
    } else {
      setShowModal(false);
    }
  });

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
              <DatePicker
                value={dateSince}
                onChange={newValue => {
                  setDateSince(newValue);
                  clearErrors('dateSince');
                  if (newValue) {
                    setValue('dateSince', newValue, { shouldValidate: true, shouldDirty: true });
                  }
                }}
                renderInput={params => (
                  <TextField
                    {...register('dateSince')}
                    {...params}
                    label="Дата начала"
                    error={!!errors?.dateSince}
                    helperText={errors.dateSince?.message}
                  />
                )}
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
              <DatePicker
                value={dateUntil}
                onChange={newValue => {
                  setDateUntil(newValue);
                  clearErrors('dateUntil');
                  if (newValue) {
                    setValue('dateUntil', newValue, { shouldValidate: true, shouldDirty: true });
                  }
                }}
                renderInput={params => (
                  <TextField
                    {...register('dateUntil')}
                    {...params}
                    label="Дата окончания"
                    error={!!errors?.dateUntil}
                    helperText={errors.dateUntil?.message}
                  />
                )}
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
            <div className={style.selectBlock}>
              <TextField
                {...register('forGroupId')}
                select
                label="Для класса"
                defaultValue=""
                helperText={errors.forGroupId?.message}
                error={!!errors?.forGroupId}
                disabled={!groups.length}
              >
                {groupsOptions.map(({ label, value }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
        </div>

        <h4 className={style.error}>{errorMessage}</h4>
        <div className={style.saveBtn}>
          <Button onClick={onSubmit}>Сохранить</Button>
        </div>
      </div>
    </form>
  );
});
