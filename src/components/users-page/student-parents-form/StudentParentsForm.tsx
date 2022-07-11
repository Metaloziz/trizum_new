import React, { ChangeEvent, FC, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { SexEnum } from 'app/enums/CommonEnums';
import { Roles } from 'app/stores/appStore';
import usersStore from 'app/stores/usersStore';
import { RequestRegister } from 'app/types/AuthTypes';
import { RequestParenting } from 'app/types/UserTypes';
import iconMedal from 'assets/svgs/medal.svg';
import Button from 'components/button/Button';
import CustomImageWrapper from 'components/custom-image-wrapper/CustomImageWrapper';
import Image from 'components/image/Image';
import InformationItem from 'components/information-item/InformationItem';
import CustomSelect, { Option } from 'components/select/CustomSelect';
import TextFieldCalendar from 'components/text-field-calendar/TextFieldCalendar';
import TextField from 'components/text-field/TextField';
import ButtonAddParent from 'components/users-page/button-add-parent/ButtonAddParent';
import styles from 'components/users-page/student-parents-form/StudentParentsForm.module.scss';
import user from 'public/svgs/user.svg';

const sexOptions = Object.values(SexEnum).map(el => ({ label: el, value: el }));

type Props = {
  id: number;
  studentId: string;
  isMainParent: boolean;
  setIsMainParent: (value: boolean, id: number) => void;
  setIsSubmitSuccessful: (isSuccess: boolean, id: number) => void;
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
}) => {
  const [isDisable, setIsDisable] = useState(false);

  const handlerRadioChange = () => {
    setIsMainParent(!isMainParent, id);
  };

  const schema = yup.object().shape({
    firstName: yup.string().required('Обязательное поле'),
    middleName: yup.string().required('Обязательное поле'),
    lastName: yup.string().required('Обязательное поле'),
    city: yup.string().required('Обязательное поле'),
    phone: yup.string().required('Обязательное поле'),
    email: yup.string().required('Обязательное поле').email(),
    birthdate: yup.string().required('Обязательное поле'),
    sex: yup.object().required('Обязательное поле'),
    isMain: yup.boolean().required('Обязательное поле'),
    // group: yup.object().required('Обязательное поле'),
    // teacher: yup.string().required('Обязательное поле'),
  });

  const defaultValues = {
    firstName: 'qwe',
    middleName: 'qwe', // todo for dev
    lastName: 'qwe',
    city: 'Moscow',
    phone: '8029',
    email: 'asf@asdasdas.by',
    birthdate: '01.01.2000',
    sex: sexOptions[0],
    isMain: false,
    // group: undefined,
    // teacher: '',
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
      const res = await usersStore.createUser(data);
      if (res) {
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
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <span>Дата рождения:</span>
            <Controller
              name="birthdate"
              render={({ field }) => (
                <TextFieldCalendar {...field} dataAuto="" value="01.01.2000" /> // todo value="01.01.2000" for dev
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
                // @ts-ignore
                error={errors.sex?.message}
              />
            )}
            control={control}
          />

          <Controller
            name="isMain"
            control={control}
            render={(
              { field: { value, ...props } }, // todo Controller + checkbox. Выделил Value так как оно не подходит для checkbox
            ) => (
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
          <Button type="submit" disabled={isDisable}>
            Сохранить
          </Button>
        </form>
      </div>
    </div>
  );
};

export default StudentParentsForm;
