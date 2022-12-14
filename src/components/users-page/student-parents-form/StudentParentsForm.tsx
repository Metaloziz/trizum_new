import usersStore from 'app/stores/usersStore';
import { observer } from 'mobx-react-lite';
import React, { FC, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { SexEnum } from 'app/enums/CommonEnums';
import { Roles } from 'app/stores/appStore';
import { RequestRegister } from 'app/types/AuthTypes';
import { ParentT, ResponseParenting } from 'app/types/UserTypes';
import iconMedal from 'assets/svgs/medal.svg';
import Button from 'components/button/Button';
import Image from 'components/image/Image';
import CustomSelect from 'components/select-mui/CustomSelect';
import styles from 'components/users-page/student-parents-form/StudentParentsForm.module.scss';
import { action } from 'components/users-page/student-parents-form/utils/action';
import { sexOptions } from 'components/users-page/student-parents-form/utils/sexOptions';
import { MAX_NAMES_LENGTH, MIN_NAMES_LENGTH } from 'constants/constants';
import { REG_EMAIL, REG_NAME } from 'constants/regExp';
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
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type Props = {
  localParentFormID: number;
  studentId: string;
  franchiseId: string;
  isMainParent: boolean;
  setIsMainParent: (value: boolean, id: number, parentingId?: string) => void;
  setSuccessForm: (isSuccess: boolean, id: number, parentingData?: ResponseParenting) => void;
  parent?: ParentT;
  isSuccessSubmit: boolean;
  isViewMode?: boolean;
};

type CreateParentPayloadT = Omit<
  RequestRegister,
  'tariffId' | 'franchiseId' | 'isSecondChild' | 'role' | 'groupId' | 'sex'
> & { sex: OptionT | undefined | any; isMain: boolean };

const StudentParentsForm: FC<Props> = observer(
  ({
    setSuccessForm,
    studentId,
    franchiseId,
    localParentFormID,
    isMainParent,
    setIsMainParent,
    parent,
    isSuccessSubmit,
    isViewMode,
  }) => {
    const { currentUser } = usersStore;
    const [isDisableSubmit, setIsDisableSubmit] = useState(false);

    const handlerRadioChange = () => {
      setIsMainParent(!isMainParent, localParentFormID, parent?.id);
    };

    const userFranchiseId: string | undefined = currentUser?.franchise?.id as string | undefined;

    const schema = yup.object().shape(
      {
        firstName: yup
          .string()
          .required('???????????????????????? ????????')
          .matches(REG_NAME, '?????????????????? ???????????? ??????????????????')
          .max(MAX_NAMES_LENGTH, `???????????????????????? ???????????? ${MAX_NAMES_LENGTH} ????????????????`)
          .min(MIN_NAMES_LENGTH, `?????????????????????? ???????????? ${MIN_NAMES_LENGTH} ??????????????`),
        middleName: yup
          .string()
          .required('???????????????????????? ????????')
          .matches(REG_NAME, '?????????????????? ???????????? ??????????????????')
          .max(MAX_NAMES_LENGTH, `???????????????????????? ???????????? ${MAX_NAMES_LENGTH} ????????????????`)
          .min(MIN_NAMES_LENGTH, `?????????????????????? ???????????? ${MIN_NAMES_LENGTH} ??????????????`),
        lastName: yup
          .string()
          .required('???????????????????????? ????????')
          .matches(REG_NAME, '?????????????????? ???????????? ??????????????????')
          .max(MAX_NAMES_LENGTH, `???????????????????????? ???????????? ${MAX_NAMES_LENGTH} ????????????????`)
          .min(MIN_NAMES_LENGTH, `?????????????????????? ???????????? ${MIN_NAMES_LENGTH} ??????????????`),
        city: yup
          .string()
          .required('???????????????????????? ????????')
          .matches(REG_NAME, '?????????????????? ???????????? ??????????????????')
          .max(MAX_NAMES_LENGTH, `???????????????????????? ???????????? ${MAX_NAMES_LENGTH} ????????????????`)
          .min(MIN_NAMES_LENGTH, `?????????????????????? ???????????? ${MIN_NAMES_LENGTH} ??????????????`),
        phone: yup.string().required('???????????????????????? ????????'),
        email: yup
          .string()
          .email('???????????????????????? ????????')
          .matches(REG_EMAIL, '?????????????? ???????????????? email')
          .required('???????????????????????? ????????'),
        birthdate: yup
          .date()
          .required('???????????????????????? ????????')
          .min('01-01-1920', '?????????????? ???????????? ???? ??????????'),
        sex: yup.string().required('???????????????????????? ????????'),
        isMain: yup.boolean().required('???????????????????????? ????????'),
        password: parent?.id
          ? yup
              .string()
              .nullable()
              .notRequired()
              .nullable()
              .when('password', {
                is: (value: any) => value?.length,
                then: rule => rule.min(6, '?????????????? 6 ????????????????').max(30, '???????????????? 30 ????????????????'),
              })
          : yup.string().required('???????????????????????? ????????').min(6).max(30),
      },
      [['password', 'password']],
    );

    const defaultValues = {
      firstName: parent?.firstName || '',
      middleName: parent?.middleName || '',
      lastName: parent?.lastName || '',
      city: parent?.city || '',
      phone: parent?.phone || '',
      email: parent?.email || '',
      birthdate: parent?.birthdate?.date || '',
      sex: sexOptions[0]?.value,
      isMain: parent?.main || false,
      franchiseId: userFranchiseId,
      password: parent?.password || '',
    };

    const {
      handleSubmit,
      control,
      setError,
      formState: { errors },
    } = useForm<typeof defaultValues>({
      mode: 'onChange',
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
        franchiseId: userFranchiseId,
        email: values.email,
        birthdate: values.birthdate,
        role: Roles.Parent,
        password: values.password,
      };

      await action(
        setIsDisableSubmit,
        parent,
        newParent,
        setError,
        studentId,
        values.isMain,
        setSuccessForm,
        localParentFormID,
      );
    };

    return (
      <form>
        <Box className={styles.wrapper}>
          {isViewMode && <div className={styles.block} />}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                render={({ field }) => (
                  <TextFieldCustom
                    type="text"
                    autoComplete="on"
                    label="??????????????"
                    error={errors.lastName?.message}
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
                    label="??????"
                    error={errors.firstName?.message}
                    {...field}
                  />
                )}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="middleName"
                render={({ field }) => (
                  <TextFieldCustom
                    type="text"
                    autoComplete="on"
                    {...field}
                    label="????????????????"
                    error={errors.middleName?.message}
                  />
                )}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="city"
                render={({ field }) => (
                  <TextFieldCustom
                    type="text"
                    autoComplete="on"
                    {...field}
                    label="??????????"
                    error={errors.city?.message}
                  />
                )}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="phone"
                render={({ field }) => (
                  <TextFieldPhoneCustom {...field} label="??????????????" error={errors.phone?.message} />
                )}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="birthdate"
                render={({ field }) => (
                  <FormControl fullWidth>
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
                          label="???????? ????????????????"
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
                  <TextFieldCustom
                    type="text"
                    autoComplete="on"
                    {...field}
                    label="??????????"
                    error={errors.email?.message}
                  />
                )}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="password"
                render={({ field }) => (
                  <TextFieldCustom
                    type="text"
                    autoComplete="on"
                    {...field}
                    label="????????????"
                    error={errors.password?.message}
                  />
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
                    title="??????"
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
                      <>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="primary"
                                checked={isMainParent}
                                onChange={e => {
                                  if (!isMainParent) {
                                    field.onChange(e);
                                    handlerRadioChange();
                                  }
                                }}
                              />
                            }
                            label="????????????????"
                          />
                          <FormHelperText error={!errors.isMain?.message}>
                            {errors.isMain?.message}
                          </FormHelperText>
                        </FormGroup>
                        {isMainParent && (
                          <Image src={iconMedal} width="20" height="20" alt="medal" />
                        )}
                      </>
                    </div>
                  </div>
                )}
              />
            </Grid>
            {isViewMode || (
              <Grid item xs={12} sm={6}>
                <Button type="submit" disabled={isDisableSubmit} onClick={handleSubmit(onSubmit)}>
                  ??????????????????
                </Button>
              </Grid>
            )}
          </Grid>
        </Box>
      </form>
    );
  },
);

export default StudentParentsForm;
