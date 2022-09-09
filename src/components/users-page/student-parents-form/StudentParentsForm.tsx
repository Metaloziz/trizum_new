import { observer } from 'mobx-react-lite';
import React, { FC, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { SexEnum } from 'app/enums/CommonEnums';
import { Roles } from 'app/stores/appStore';
import { RequestRegister } from 'app/types/AuthTypes';
import { ParentT } from 'app/types/UserTypes';
import iconMedal from 'assets/svgs/medal.svg';
import Button from 'components/button/Button';
import Image from 'components/image/Image';
import CustomSelect from 'components/select-mui/CustomSelect';
import styles from 'components/users-page/student-parents-form/StudentParentsForm.module.scss';
import { action } from 'components/users-page/student-parents-form/utils/action';
import { sexOptions } from 'components/users-page/student-parents-form/utils/sexOptions';
import { MAIN_PARENT_ID } from 'components/users-page/student-parrents-form-container/store/store';
import { MAX_NAMES_LENGTH, MIN_NAMES_LENGTH } from 'constants/constants';
import { REG_NAME } from 'constants/regExp';
import { OptionT } from 'app/types/OptionT';
import TextFieldCustom from '../../text-field-mui/TextFieldCustom';
import TextFieldPhoneCustom from '../../text-field-phone-mui/TextFieldPhoneCustom';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  InputLabel,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type Props = {
  localParentFormID: number;
  studentId: string;
  franchiseId: string;
  isMainParent: boolean;
  setIsMainParent: (value: boolean, id: number) => void;
  setIsSubmitSuccessful: (isSuccess: boolean, id: number) => void;
  parent?: ParentT;
  isSubmitAnyForm: boolean;
};

type CreateParentPayloadT = Omit<
  RequestRegister,
  'tariffId' | 'franchiseId' | 'isSecondChild' | 'role' | 'groupId' | 'sex'
> & { sex: OptionT | undefined | any; isMain: boolean };

const StudentParentsForm: FC<Props> = observer(
  ({
    setIsSubmitSuccessful,
    studentId,
    franchiseId,
    localParentFormID,
    isMainParent,
    setIsMainParent,
    parent,
    isSubmitAnyForm,
  }) => {
    const [isDisableSubmit, setIsDisableSubmit] = useState(false);

    const handlerRadioChange = () => {
      setIsMainParent(!isMainParent, localParentFormID);
    };

    const schema = yup.object().shape({
      firstName: yup
        .string()
        .required('Обязательное поле')
        .matches(REG_NAME, 'допустима только кириллица')
        .max(MAX_NAMES_LENGTH, `максимальная длинна ${MAX_NAMES_LENGTH} символов`)
        .min(MIN_NAMES_LENGTH, `минимальная длинна ${MIN_NAMES_LENGTH} символа`),
      middleName: yup
        .string()
        .required('Обязательное поле')
        .matches(REG_NAME, 'допустима только кириллица')
        .max(MAX_NAMES_LENGTH, `максимальная длинна ${MAX_NAMES_LENGTH} символов`)
        .min(MIN_NAMES_LENGTH, `минимальная длинна ${MIN_NAMES_LENGTH} символа`),
      lastName: yup
        .string()
        .required('Обязательное поле')
        .matches(REG_NAME, 'допустима только кириллица')
        .max(MAX_NAMES_LENGTH, `максимальная длинна ${MAX_NAMES_LENGTH} символов`)
        .min(MIN_NAMES_LENGTH, `минимальная длинна ${MIN_NAMES_LENGTH} символа`),
      city: yup
        .string()
        .required('Обязательное поле')
        .matches(REG_NAME, 'допустима только кириллица')
        .max(MAX_NAMES_LENGTH, `максимальная длинна ${MAX_NAMES_LENGTH} символов`)
        .min(MIN_NAMES_LENGTH, `минимальная длинна ${MIN_NAMES_LENGTH} символа`),
      phone: yup.string().required('Обязательное поле'),
      email: yup
        .string()
        .email('Обязательное поле')
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'Введите верный email',
        )
        .required('Обязательное поле'),
      birthdate: yup
        .date()
        .required('Обязательное поле')
        .min('01-01-1920', 'Возраст выбран не верно'), // todo проверить после добавления dataPicker
      sex: yup.string().required('Обязательное поле'),
      isMain: yup.boolean().required('Обязательное поле'),
    });

    const defaultValues = {
      firstName: parent?.firstName || '',
      middleName: parent?.middleName || '',
      lastName: parent?.lastName || '',
      city: parent?.city || '',
      phone: parent?.phone || '',
      email: parent?.email || '',
      birthdate: '01.01.2000',
      sex: sexOptions[0]?.value,
      isMain: parent?.main || false,
    };
    const {
      handleSubmit,
      control,
      setError,
      formState: { errors },
    } = useForm<typeof defaultValues>({
      // mode: 'onChange',
      defaultValues,
      resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<CreateParentPayloadT> = async values => {
      const newParent: RequestRegister = {
        sex: (values.sex as SexEnum) === SexEnum.Male,
        phone: values.phone?.replace(/[()\s+-]/g, ''),
        middleName: values.middleName,
        city: values.city,
        lastName: values.lastName,
        firstName: values.firstName,
        franchiseId,
        email: values.email,
        birthdate: values.birthdate,
        role: Roles.Parent,
      };

      await action(
        setIsDisableSubmit,
        parent,
        newParent,
        setError,
        studentId,
        values.isMain,
        setIsSubmitSuccessful,
        localParentFormID,
      );
    };

    return (
      <form>
        <Box className={styles.wrapper}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                render={({ field }) => (
                  <TextFieldCustom label="Фамилия" error={errors.lastName?.message} {...field} />
                )}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstName"
                render={({ field }) => (
                  <TextFieldCustom label="Имя" error={errors.firstName?.message} {...field} />
                )}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="middleName"
                render={({ field }) => (
                  <TextFieldCustom {...field} label="Отчество" error={errors.middleName?.message} />
                )}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="city"
                render={({ field }) => (
                  <TextFieldCustom {...field} label="Город" error={errors.city?.message} />
                )}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="phone"
                render={({ field }) => (
                  <TextFieldPhoneCustom {...field} label="Телефон" error={errors.phone?.message} />
                )}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="birthdate"
                render={({ field }) => (
                  <FormControl fullWidth>
                    {/* <InputLabel htmlFor="birthdate">Дата рождения</InputLabel> */}
                    <DatePicker
                      {...field}
                      onChange={(date: Date | null) => {
                        if (date) {
                          field.onChange(date);
                        }
                      }}
                      value={field.value ? new Date(field.value) : null}
                      renderInput={props => (
                        <TextField
                          {...props}
                          label="Дата рождения"
                          error={!!errors.birthdate?.message}
                          helperText={errors.birthdate?.message}
                        />
                      )}
                    />
                  </FormControl>
                )}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="email"
                render={({ field }) => (
                  <TextFieldCustom {...field} label="Почта" error={errors.email?.message} />
                )}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="sex"
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    title="Пол"
                    options={sexOptions}
                    error={errors.sex?.message}
                  />
                )}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="isMain"
                control={control}
                render={({ field }) => (
                  <div className={styles.selectWrapper}>
                    <div className={styles.label}>
                      {localParentFormID === MAIN_PARENT_ID && (
                        <>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  color="primary"
                                  checked={isMainParent}
                                  disabled={isSubmitAnyForm}
                                  onChange={e => {
                                    field.onChange(e);
                                    handlerRadioChange();
                                  }}
                                />
                              }
                              label="Основной"
                            />
                            <FormHelperText error={!errors.isMain?.message}>
                              {errors.isMain?.message}
                            </FormHelperText>
                          </FormGroup>
                          <Image src={iconMedal} width="20" height="20" alt="medal" />
                        </>
                      )}
                    </div>
                  </div>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button type="submit" disabled={isDisableSubmit} onClick={handleSubmit(onSubmit)}>
                Сохранить
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    );
  },
);

export default StudentParentsForm;
