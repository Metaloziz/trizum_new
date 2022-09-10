import React, { FC, useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, FormControl, FormHelperText, Grid, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import styles from './StudentPageFranchiseeModalAddUser.module.scss';

import { SexEnum } from 'app/enums/CommonEnums';
import { Roles } from 'app/stores/appStore';
import franchiseeStore from 'app/stores/franchiseeStore';
import groupStore from 'app/stores/groupStore';
import tariffsStore from 'app/stores/tariffsStore';
import { RequestRegister } from 'app/types/AuthTypes';
import { ResponseOneUser } from 'app/types/UserTypes';
import SetStatusButton from 'components/button-open-close/SetStatusButton';
import Button from 'components/button/Button';
import CustomSelect from 'components/select-mui/CustomSelect';
import TextFieldCustom from 'components/text-field-mui/TextFieldCustom';
import { action } from 'components/users-page/student-page-franchisee-modal-add-user/utils/action';
import { isMethodistTutor } from 'components/users-page/student-page-franchisee-modal-add-user/utils/IsMethodistTutor';
import { isStudentCreated } from 'components/users-page/student-page-franchisee-modal-add-user/utils/isStudentCreated';
import { isStudentRole } from 'components/users-page/student-page-franchisee-modal-add-user/utils/isStudentRole';
import { isStudentTeacherEducation } from 'components/users-page/student-page-franchisee-modal-add-user/utils/isStudentTeacherEducation';
import { StudentParentsFormContainer } from 'components/users-page/student-parrents-form-container/StudentParentsFormContainer';
import { roleOptions } from 'components/users-page/student-page-franchisee-modal-add-user/utils/roleOptions';
import { MAX_NAMES_LENGTH, MIN_NAMES_LENGTH } from 'constants/constants';
import { REG_NAME } from 'constants/regExp';
import { convertFranchiseeOptions } from 'utils/convertFranchiseeOptions';
import { convertGroupOptions } from 'utils/convertGroupOptions';
import { convertSexOptions } from 'utils/convertSexOptions';
import { convertTariffOptions } from 'utils/convertTariffOptions';
import { removeEmptyFields } from 'utils/removeEmptyFields';
import TextFieldPhoneCustom from '../../text-field-phone-mui/TextFieldPhoneCustom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type Props = {
  onCloseModal: () => void;
  user?: ResponseOneUser;
  visibility?: boolean;
};

export const StudentPageFranchiseeModalAddUser: FC<Props> = observer(
  ({ user, onCloseModal, visibility }) => {
    const { franchise } = franchiseeStore;
    const { groups, loadCurrentGroups } = groupStore;
    const { tariffs } = tariffsStore;

    const franchiseOptions = convertFranchiseeOptions(franchise);
    const sexOptions = convertSexOptions();
    const groupOptions = convertGroupOptions(groups);
    const tariffsOptions = convertTariffOptions(tariffs);
    const [isParentShown, setIsParentShown] = useState(false);
    const [studentId, setStudentId] = useState('');
    const [selectedRole, setSelectedRole] = useState<Roles>();
    const [currentFranchiseId, setCurrentFranchiseId] = useState<string>('');

    useEffect(() => {
      if (user?.roleCode) {
        setSelectedRole(user.roleCode as Roles);
      }
    }, []);
    const findSex = () => (user?.sex ? sexOptions[0].value : sexOptions[1].value);

    const defaultValues = {
      firstName: user?.firstName || '',
      middleName: user?.middleName || '',
      lastName: user?.lastName || '',
      role: '', // не изменяется при редактировании
      sex: findSex() || sexOptions[0].value,
      city: user?.city || '',
      phone: user?.phone || '',
      birthdate: user?.birthdate?.date || '01.01.2000',
      email: user?.email || '',
      franchise: '', // не изменяется при редактировании
      tariff: user?.tariff || '', // не изменяется при редактировании
      group: '', // не изменяется при редактировании
    };

    const schema = yup.object().shape({
      firstName: yup
        .string()
        .required('Обязательное поле')
        .matches(REG_NAME, 'Допустима только кириллица')
        .max(MAX_NAMES_LENGTH, `Максимальная длинна ${MAX_NAMES_LENGTH} символов`)
        .min(MIN_NAMES_LENGTH, `Минимальная длинна ${MIN_NAMES_LENGTH} символа`),
      middleName: yup
        .string()
        .required('Обязательное поле')
        .matches(REG_NAME, 'Допустима только кириллица')
        .max(MAX_NAMES_LENGTH, `Максимальная длинна ${MAX_NAMES_LENGTH} символов`)
        .min(MIN_NAMES_LENGTH, `минимальная длинна ${MIN_NAMES_LENGTH} символа`),
      lastName: yup
        .string()
        .required('Обязательное поле')
        .matches(REG_NAME, 'Допустима только кириллица')
        .max(MAX_NAMES_LENGTH, `Максимальная длинна ${MAX_NAMES_LENGTH} символов`)
        .min(MIN_NAMES_LENGTH, `Минимальная длинна ${MIN_NAMES_LENGTH} символа`),
      role: user ? yup.string().notRequired() : yup.string().required('Обязательное поле'),
      sex: yup.string().required('Обязательное поле'),
      city: yup
        .string()
        .required('Обязательное поле')
        .matches(REG_NAME, 'Допустима только кириллица')
        .max(MAX_NAMES_LENGTH, `Максимальная длинна ${MAX_NAMES_LENGTH} символов`)
        .min(MIN_NAMES_LENGTH, `Минимальная длинна ${MIN_NAMES_LENGTH} символа`),
      phone:
        selectedRole === Roles.Student
          ? yup.string().notRequired()
          : yup.string().required('Обязательное поле'),
      /* .matches(REG_PHONE, 'необходим формат 7 ХХХ ХХХ ХХ ХХХ')
        .length(PHONE_LENGTH, `номер должен быть из ${PHONE_LENGTH} цифр`), */
      birthdate: yup
        .date()
        .required('Обязательное поле')
        .min('01-01-1920', 'Возраст выбран не верно'), // todo проверить после добавления dataPicker
      email:
        selectedRole === Roles.Student
          ? yup.string().notRequired()
          : yup
              .string()
              .email('Обязательное поле')
              .matches(
                /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,

                'Введите валидный email',
              )
              .required('Обязательное поле'),
      franchise: user
        ? yup.string().notRequired()
        : isMethodistTutor(selectedRole)
        ? yup.string().required('Обязательное поле')
        : yup.string().notRequired(),
      tariff:
        selectedRole === Roles.Student
          ? yup.string().required('Обязательное поле')
          : yup.string().notRequired(),
    });

    const {
      handleSubmit,
      control,
      setError,
      resetField,
      reset,
      formState: { errors, isSubmitSuccessful },
    } = useForm<typeof defaultValues>({
      mode: 'onChange',
      resolver: yupResolver(schema),
      defaultValues,
    });

    const onSubmit = handleSubmit(async values => {
      const newUserData: RequestRegister = {
        sex: (values.sex as SexEnum) === SexEnum.Male,
        franchiseId: values.franchise,
        birthdate: values.birthdate,
        city: values.city,
        role: values.role as Roles,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        middleName: values.middleName,
        phone: values.phone.replace(/[()\s+-]/g, ''),
        isSecondChild: false,
        tariffId: values.tariff,
      };

      action(
        user,
        removeEmptyFields(newUserData),
        setError,
        values.role as Roles,
        onCloseModal,
        reset,
        setStudentId,
        setIsParentShown,
        values.role,
        values.franchise,
        values.tariff,
        values.group,
      );
    });

    const getCurrentGroups = (franchiseId: string) => {
      resetField('group');
      loadCurrentGroups(selectedRole, { franchiseId, type: 'class' });
    };

    useEffect(() => {
      if (selectedRole !== Roles.Student) {
        setIsParentShown(false);
      }

      if (isStudentTeacherEducation(selectedRole)) {
        loadCurrentGroups(selectedRole, { franchiseId: franchiseOptions[0].value, type: 'class' });
      }

      resetField('franchise');
    }, [selectedRole]);

    return (
      <>
        <form onSubmit={onSubmit}>
          <Box className={styles.wrapper}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h2 className={styles.tableTitle}>
                  {user ? 'Редактирование пользователя' : 'Регистрация пользователя'}
                </h2>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="middleName"
                  render={({ field }) => (
                    <TextFieldCustom
                      type="text"
                      autoComplete="on"
                      label="Фамилия"
                      error={errors.middleName?.message}
                      {...field}
                    />
                  )}
                  control={control}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="firstName"
                  render={({ field }) => (
                    <TextFieldCustom
                      type="text"
                      autoComplete="on"
                      label="Имя"
                      error={errors.firstName?.message}
                      {...field}
                    />
                  )}
                  control={control}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="lastName"
                  render={({ field }) => (
                    <TextFieldCustom
                      type="text"
                      autoComplete="on"
                      label="Отчество"
                      error={errors.lastName?.message}
                      {...field}
                    />
                  )}
                  control={control}
                />
              </Grid>
              {isStudentCreated(isParentShown, studentId) && (
                <>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="city"
                      render={({ field }) => (
                        <TextFieldCustom
                          type="text"
                          autoComplete="on"
                          {...field}
                          label="Город"
                          error={errors.city?.message}
                        />
                      )}
                      control={control}
                    />
                  </Grid>
                  {!user && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="role"
                          render={({ field }) => (
                            <CustomSelect
                              {...field}
                              onChange={e => {
                                setSelectedRole(e.target.value as Roles);
                                field.onChange(e);
                              }}
                              title="Роль"
                              options={roleOptions}
                              error={errors.role?.message}
                            />
                          )}
                          control={control}
                        />
                      </Grid>
                      {isMethodistTutor(selectedRole) && (
                        <Grid item xs={12} sm={6}>
                          <Controller
                            name="franchise"
                            render={({ field }) => (
                              <CustomSelect
                                {...field}
                                onChange={e => {
                                  field.onChange(e);
                                  getCurrentGroups(e.target.value);
                                  setCurrentFranchiseId(e.target.value);
                                }}
                                title="Франшиза"
                                options={franchiseOptions}
                                error={errors.franchise?.message}
                              />
                            )}
                            control={control}
                          />
                        </Grid>
                      )}
                    </>
                  )}
                  {isStudentRole(selectedRole) && (
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="tariff"
                        render={({ field }) => (
                          <CustomSelect
                            {...field}
                            onChange={e => {
                              field.onChange(e);
                            }}
                            title="Тариф"
                            options={tariffsOptions}
                            value=""
                            error={errors?.tariff?.message?.toString()}
                          />
                        )}
                        control={control}
                      />
                    </Grid>
                  )}
                  {isStudentTeacherEducation(selectedRole) && (
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="group"
                        render={({ field }) => (
                          <CustomSelect
                            {...field}
                            onChange={e => {
                              field.onChange(e);
                            }}
                            title="Группа"
                            value=""
                            options={groupOptions}
                            error={errors.group?.message}
                          />
                        )}
                        control={control}
                      />
                    </Grid>
                  )}
                  {!isStudentRole(selectedRole) && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="phone"
                          render={({ field }) => (
                            <TextFieldPhoneCustom
                              {...field}
                              label="Телефон"
                              error={errors.phone?.message}
                            />
                          )}
                          control={control}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="email"
                          render={({ field }) => (
                            <TextFieldCustom
                              type="text"
                              autoComplete="on"
                              {...field}
                              label="Почта"
                              error={errors.email?.message}
                            />
                          )}
                          control={control}
                        />
                      </Grid>
                    </>
                  )}
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="birthdate"
                      render={({ field }) => (
                        <FormControl fullWidth>
                          <DatePicker
                            onChange={(date: Date | null) => {
                              field.onChange(date);
                            }}
                            value={field.value}
                            renderInput={e => (
                              <TextField
                                {...e}
                                sx={{ width: '100%' }}
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
                  <Grid item xs={13} sm={6}>
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
                </>
              )}
              <Grid xs={12} sm={12} margin="10px 14px" display="flex">
                <Grid item xs={12} sm={6.2}>
                  <Button type="submit" disabled={isSubmitSuccessful}>
                    Сохранить
                  </Button>
                </Grid>
                <Grid item xs={12} sm={5.8}>
                  {user && <SetStatusButton status={user?.status} id={user.id} />}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </form>
        {user?.roleCode === Roles.Student && (
          <div>
            {user?.parents && (
              <StudentParentsFormContainer
                franchiseId={currentFranchiseId}
                studentId={studentId}
                onCloseModal={onCloseModal}
                parents={user.parents}
                visibility={visibility}
              />
            )}
            {isParentShown && studentId && (
              <StudentParentsFormContainer
                franchiseId={currentFranchiseId}
                studentId={studentId}
                onCloseModal={onCloseModal}
                visibility={visibility}
              />
            )}
          </div>
        )}
      </>
    );
  },
);

export default StudentPageFranchiseeModalAddUser;
