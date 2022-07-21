import React, { FC, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { SexEnum } from 'app/enums/CommonEnums';
import usersService from 'app/services/usersService';
import { Roles } from 'app/stores/appStore';
import usersStore from 'app/stores/usersStore';
import { RequestRegister } from 'app/types/AuthTypes';
import { ParentT, RequestParenting } from 'app/types/UserTypes';
import iconMedal from 'assets/svgs/medal.svg';
import Button from 'components/button/Button';
import CustomImageWrapper from 'components/custom-image-wrapper/CustomImageWrapper';
import Image from 'components/image/Image';
import CustomSelect, { Option } from 'components/select/CustomSelect';
import TextField from 'components/text-field/TextField';
import styles from 'components/users-page/student-parents-form/StudentParentsForm.module.scss';
import user from 'public/svgs/user.svg';
import { MAX_NAMES_LENGTH, MIN_NAMES_LENGTH, PHONE_LENGTH } from 'utils/consts/consts';
import { REG_NAME, REG_PHONE } from 'utils/consts/regExp';

const sexOptions = Object.values(SexEnum).map(el => ({ label: el, value: el }));

type Props = {
  id: number;
  studentId: string;
  isMainParent: boolean;
  setIsMainParent: (value: boolean, id: number) => void;
  setIsSubmitSuccessful: (isSuccess: boolean, id: number) => void;
  parent?: ParentT;
};

type CreateParentPayloadT = Omit<
  RequestRegister,
  'tariffId' | 'franchiseId' | 'isSecondChild' | 'role' | 'groupId' | 'sex'
> & { sex: Option | undefined; isMain: boolean };

const StudentParentsForm: FC<Props> = ({
  setIsSubmitSuccessful,
  studentId,
  id,
  isMainParent,
  setIsMainParent,
  parent,
}) => {
  const { createUser } = usersStore;
  const { updateUser } = usersService;

  const [isDisable, setIsDisable] = useState(false);

  const handlerRadioChange = () => {
    setIsMainParent(!isMainParent, id);
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
    phone: yup
      .string()
      .required('Обязательное поле')
      .matches(REG_PHONE, 'необходим формат 7 ХХХ ХХХ ХХ ХХХ')
      .length(PHONE_LENGTH, `номер должен быть из ${PHONE_LENGTH} цифр`),
    email: yup.string().required('Обязательное поле').email(),
    birthdate: yup.string().required('Обязательное поле'), // todo проверить после добавления dataPicker
    sex: yup.object().required('Обязательное поле'),
    isMain: yup.boolean().required('Обязательное поле'),
  });

  const defaultValues = {
    firstName: parent?.parent.firstName || '',
    middleName: parent?.parent.middleName || '',
    lastName: parent?.parent.lastName || '',
    city: parent?.parent.city || '',
    phone: parent?.parent.phone || '',
    email: parent?.parent.email || '',
    birthdate: '01.01.2000',
    sex: sexOptions[0], // todo how to set value from props ?
    isMain: parent?.isMain || false,
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitSuccessful },
    watch,
  } = useForm({ mode: 'onChange', defaultValues, resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<CreateParentPayloadT> = async ({
    sex,
    email,
    birthdate,
    firstName,
    lastName,
    middleName,
    phone,
    city,
    isMain,
  }) => {
    const data: RequestRegister = {
      sex: (sex?.label as SexEnum) === SexEnum.Male,
      phone,
      middleName,
      city,
      lastName,
      firstName,
      franchiseId: '1ecf563a-2a69-6610-a812-f92a3af0f8be',
      email,
      birthdate,
      role: Roles.Parent,
      isSecondChild: false,
    };

    try {
      setIsDisable(true);

      let res;

      if (parent) {
        res = await updateUser(data, parent.parent.id); // todo так вообще норм писать ?
      } else {
        res = await createUser(data);
      }
      if (typeof res === 'object') {
        const newParent: RequestParenting = {
          parentId: res.id,
          childId: studentId,
          isMain,
        };
        const response = await usersStore.createParenting(newParent);
        setIsSubmitSuccessful(true, id);
      }
    } catch (e) {
      setIsDisable(false);
      console.warn(e);
    }
  };

  return (
    <div className={styles.row}>
      <CustomImageWrapper variant="circle">
        <div className={styles.imageWrapper}>
          <Image src={user} width="130" height="140" alt="user" />
        </div>
      </CustomImageWrapper>
      <div className={styles.table}>
        <form>
          <Controller
            name="middleName"
            render={({ field }) => (
              <TextField {...field} label="Фамилия" error={errors.middleName?.message} />
            )}
            control={control}
          />
          <Controller
            name="firstName"
            render={({ field }) => (
              <TextField {...field} label="Имя" error={errors.firstName?.message} />
            )}
            control={control}
          />
          <Controller
            name="lastName"
            render={({ field }) => (
              <TextField {...field} label="Отчество" error={errors.lastName?.message} />
            )}
            control={control}
          />
          <Controller
            name="city"
            render={({ field }) => (
              <TextField {...field} label="Город" error={errors.city?.message} />
            )}
            control={control}
          />
          <Controller
            name="phone"
            render={({ field }) => (
              <TextField {...field} label="Телефон" error={errors.phone?.message} />
            )}
            control={control}
          />
          <div className={styles.infoItem}>
            <Controller
              name="birthdate"
              render={({ field }) => (
                <TextField {...field} label="Дата рождения:" error={errors.birthdate?.message} />
              )}
              control={control}
            />
          </div>
          <Controller
            name="email"
            render={({ field }) => (
              <TextField {...field} label="Почта" error={errors.email?.message} />
            )}
            control={control}
          />
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

          <Controller
            name="isMain"
            control={control}
            render={({ field: { value, ...props } }) => (
              <div className={styles.selectWrapper}>
                <div className={styles.label}>
                  <label>
                    <input
                      {...props}
                      type="checkbox"
                      onChange={handlerRadioChange}
                      checked={isMainParent}
                    />
                    Основной
                  </label>
                  <div className={styles.medal}>
                    <Image src={iconMedal} width="20" height="20" alt="medal" />
                  </div>
                </div>
              </div>
            )}
          />
          <Button type="submit" disabled={isDisable} onClick={handleSubmit(onSubmit)}>
            Сохранить
          </Button>
        </form>
      </div>
    </div>
  );
};

export default StudentParentsForm;
