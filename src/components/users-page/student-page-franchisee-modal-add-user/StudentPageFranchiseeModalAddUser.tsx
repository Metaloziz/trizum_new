import { FC, useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import styles from './StudentPageFranchiseeModalAddUser.module.scss';

import { SexEnum } from 'app/enums/CommonEnums';
import { RoleNames, Roles } from 'app/stores/appStore';
import franchiseeStore from 'app/stores/franchiseeStore';
import usersStore from 'app/stores/usersStore';
import { RequestRegister } from 'app/types/AuthTypes';
import { ResponseOneUser } from 'app/types/UserTypes';
import { FranchisingViewModel } from 'app/viewModels/FranchisingViewModel';
import SetStatusButton from 'components/button-open-close/SetStatusButton';
import Button from 'components/button/Button';
import Image from 'components/image/Image';
import CustomSelect, { Option } from 'components/select/CustomSelect';
import TextField from 'components/text-field/TextField';
import { StudentParentsFormContainer } from 'components/users-page/student-parrents-form-container/StudentParentsFormContainer';
import avatar from 'public/img/avatarDefault.png';
import { MAX_NAMES_LENGTH, MIN_NAMES_LENGTH, PHONE_LENGTH } from 'utils/consts/consts';
import { REG_NAME, REG_PHONE } from 'utils/consts/regExp';
import { setErrorFomMessage } from 'utils/setErrorFomMessage';

type Props = {
  onCloseModal: () => void;
  user?: ResponseOneUser;
};

const roleOptions = [
  { label: RoleNames.student, value: Roles.Student },
  { label: RoleNames.parent, value: Roles.Parent },
  { label: RoleNames.teacherEducation, value: Roles.TeacherEducation },
  { label: RoleNames.teacher, value: Roles.Teacher },
  { label: RoleNames.franchiseeAdmin, value: Roles.FranchiseeAdmin },
  { label: RoleNames.franchisee, value: Roles.Franchisee },
  { label: RoleNames.tutor, value: Roles.Tutor },
  { label: RoleNames.methodist, value: Roles.Methodist },
  { label: RoleNames.admin, value: Roles.Admin },
];

const convertFranchiseeOptions = (franchisees: FranchisingViewModel[]): Option[] =>
  franchisees.map(item => ({ value: item.id!, label: item.shortName })); // todo убрать знак - !

const sexOptions = Object.values(SexEnum).map(el => ({ label: el, value: el }));

const StudentPageFranchiseeModalAddUser: FC<Props> = observer(({ user, onCloseModal }) => {
  const { franchise } = franchiseeStore;
  const franchiseOptions = convertFranchiseeOptions(franchise);

  // const { getGroups, groups } = groupStore;
  const { createUser, updateUser } = usersStore;
  const [isParentShown, setIsParentShown] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [selectedRole1, setSelectedRole1] = useState<Roles>();
  // const [groupOptions, setGroupOptions] = useState<Option[]>([]);

  let selectedRole = '';

  const findRole = () => roleOptions.find(el => el.value === user?.roleCode);
  const findFranchisee = () => franchiseOptions.find(el => el.value === user?.franchise?.id);
  const findSex = () => (user?.sex ? sexOptions[0] : sexOptions[1]);

  const defaultValues = {
    firstName: user?.firstName || '',
    middleName: user?.middleName || '',
    lastName: user?.lastName || '',
    role: findRole() || roleOptions[roleOptions.length - 1],
    sex: findSex() || sexOptions[0],
    city: user?.city || '',
    phone: user?.phone || '',
    birthdate: user?.birthdate?.date || '01.01.2000',
    email: user?.email || '',
    franchise: findFranchisee() || franchiseOptions[0],
    // group: undefined,
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
    role: user ? yup.object().notRequired() : yup.object().required('Обязательное поле'),
    sex: yup.object().required('Обязательное поле'),
    city: yup
      .string()
      .required('Обязательное поле')
      .matches(REG_NAME, 'допустима только кириллица')
      .max(MAX_NAMES_LENGTH, `максимальная длинна ${MAX_NAMES_LENGTH} символов`)
      .min(MIN_NAMES_LENGTH, `минимальная длинна ${MIN_NAMES_LENGTH} символа`),
    phone:
      selectedRole1 === Roles.Student
        ? yup.string().notRequired()
        : yup
            .string()
            .required('Обязательное поле')
            .matches(REG_PHONE, 'необходим формат 7 ХХХ ХХХ ХХ ХХХ')
            .length(PHONE_LENGTH, `номер должен быть из ${PHONE_LENGTH} цифр`),
    birthdate: yup.string().required('Обязательное поле'), // todo проверить после добавления dataPicker
    email:
      selectedRole1 === Roles.Student
        ? yup.string().notRequired()
        : yup.string().required('Обязательное поле').email(),
    franchise: user ? yup.object().notRequired() : yup.object().required('Обязательное поле'),
    // group: yup.object().required('Обязательное поле'), // todo разобраться в постмане как создавать нормально группы и потом перенести в код
  });

  const {
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors, isSubmitSuccessful },
    watch,
  } = useForm({ resolver: yupResolver(schema), defaultValues });

  selectedRole = watch('role').value;

  useEffect(() => {
    if (selectedRole !== Roles.Student) {
      setIsParentShown(false);
    }
  }, [selectedRole]);

  const onSubmit = handleSubmit(async values => {
    const newUserData: RequestRegister = {
      sex: (values.sex?.label as SexEnum) === SexEnum.Male,
      franchiseId: values.franchise.value,
      birthdate: values.birthdate || '',
      city: values.city,
      role: values.role.value as Roles,
      email: values.email,
      // groupId: values.?.value || '',
      firstName: values.firstName,
      lastName: values.lastName,
      middleName: values.middleName,
      phone: values.phone,
      isSecondChild: false,
    };

    let res;

    if (user) {
      res = await updateUser(newUserData, user.id); // вынести ?
      if (typeof res === 'string') {
        setErrorFomMessage(res, setError);
        return;
      }
    } else {
      res = await createUser(newUserData);
      if (typeof res === 'string') {
        setErrorFomMessage(res, setError);
        return;
      }
    }

    if ((values.role.value as Roles) !== Roles.Student) {
      onCloseModal();
      reset();
      return;
    }
    if (typeof res === 'object' && 'id' in res) {
      setStudentId(res.id);
      setIsParentShown(true);
    }
  });

  return (
    <>
      <h2>Добавление/изменение пользователя</h2>
      <Grid container spacing={{ xs: 2, sm: 8, md: 8 }} columns={{ xs: 2, sm: 12, md: 12 }}>
        <Grid item xs={12} sm={5} md={5}>
          <div className={styles.avatar}>
            <Image
              className={styles.imageWrapper}
              src={avatar}
              width="290"
              height="290"
              alt="student"
            />
            {user && <SetStatusButton status={user?.status} id={user.id} />}
          </div>
        </Grid>
        <Grid item xs={12} sm={7} md={7}>
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
              {!user && ( // при редактировании нельзя менять роль и франшизу
                <>
                  <Controller
                    name="role"
                    render={({ field }) => (
                      <CustomSelect
                        {...field}
                        onChange={e => {
                          setSelectedRole1(e.value as Roles);
                          field.onChange(e);
                        }}
                        title="Роль"
                        options={roleOptions}
                        error={errors.role?.message}
                      />
                    )}
                    control={control}
                  />
                  <Controller
                    name="franchise"
                    render={({ field }) => (
                      <CustomSelect
                        {...field}
                        onChange={e => {
                          field.onChange(e);
                        }}
                        title="Франшиза"
                        options={franchiseOptions}
                        error={errors.franchise?.message}
                      />
                    )}
                    control={control}
                  />
                </>
              )}
              {selectedRole !== Roles.Student && (
                <Controller
                  name="phone"
                  render={({ field }) => (
                    <TextField {...field} label="Телефон" error={errors.phone?.message} />
                  )}
                  control={control}
                />
              )}
              <Controller
                name="birthdate"
                render={({ field }) => (
                  <TextField {...field} label="Дата рождения:" /> // todo value="01.01.2000" for dev
                )}
                control={control}
              />
              {selectedRole !== Roles.Student && (
                <Controller
                  name="email"
                  render={({ field }) => (
                    <TextField {...field} label="Почта" error={errors.email?.message} />
                  )}
                  control={control}
                />
              )}
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
              <div className={styles.button}>
                <Button type="submit" disabled={isSubmitSuccessful} onClick={onSubmit}>
                  Сохранить
                </Button>
              </div>
            </form>
          </div>
        </Grid>
      </Grid>
      {user?.parents && (
        <StudentParentsFormContainer
          studentId={studentId}
          onCloseModal={onCloseModal}
          parents={user.parents}
        />
      )}
      {isParentShown && studentId && (
        <StudentParentsFormContainer studentId={studentId} onCloseModal={onCloseModal} />
      )}
    </>
  );
});

export default StudentPageFranchiseeModalAddUser;
