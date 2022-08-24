import React, {FC, useEffect, useState} from 'react';

import {yupResolver} from '@hookform/resolvers/yup';
import {Grid} from '@mui/material';
import {observer} from 'mobx-react-lite';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';

import styles from './StudentPageFranchiseeModalAddUser.module.scss';

import {SexEnum} from 'app/enums/CommonEnums';
import {Roles} from 'app/stores/appStore';
import franchiseeStore from 'app/stores/franchiseeStore';
import groupStore from 'app/stores/groupStore';
import tariffsStore from 'app/stores/tariffsStore';
import {RequestRegister} from 'app/types/AuthTypes';
import {ResponseOneUser} from 'app/types/UserTypes';
import SetStatusButton from 'components/button-open-close/SetStatusButton';
import Button from 'components/button/Button';
import Image from 'components/image/Image';
import CustomSelect, {Option} from 'components/select-mui/CustomSelect';
import TextFieldCustom from 'components/text-field-mui/TextFieldCustom';
import {action} from 'components/users-page/student-page-franchisee-modal-add-user/utils/action';
import {isMethodistTutor} from 'components/users-page/student-page-franchisee-modal-add-user/utils/IsMethodistTutor';
import {isStudentCreated} from 'components/users-page/student-page-franchisee-modal-add-user/utils/isStudentCreated';
import {isStudentRole} from 'components/users-page/student-page-franchisee-modal-add-user/utils/isStudentRole';
import {
    isStudentTeacherEducation
} from 'components/users-page/student-page-franchisee-modal-add-user/utils/isStudentTeacherEducation';
import {roleOptions} from 'components/users-page/student-page-franchisee-modal-add-user/utils/roleOptions';
import {
    StudentParentsFormContainer
} from 'components/users-page/student-parrents-form-container/StudentParentsFormContainer';
import {MAX_NAMES_LENGTH, MIN_NAMES_LENGTH} from 'constants/constants';
import {REG_NAME} from 'constants/regExp';
import avatar from 'public/img/avatarDefault.png';
import {convertFranchiseeOptions} from 'utils/convertFranchiseeOptions';
import {convertGroupOptions} from 'utils/convertGroupOptions';
import {convertSexOptions} from 'utils/convertSexOptions';
import {convertTariffOptions} from 'utils/convertTariffOptions';
import {removeEmptyFields} from 'utils/removeEmptyFields';
import TextFieldPhoneCustom from "../../text-field-phone-mui/TextFieldPhoneCustom";

type Props = {
    onCloseModal: () => void;
    user?: ResponseOneUser;
};

export const StudentPageFranchiseeModalAddUser: FC<Props> = observer(({user, onCloseModal}) => {
    const {franchise} = franchiseeStore;
    const {groups, loadCurrentGroups} = groupStore;
    const {tariffs} = tariffsStore;

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

    const findSex = () => (user?.sex ? sexOptions[0] : sexOptions[1]);

    const defaultValues = {
        firstName: user?.firstName || 'ИВАНОВ',
        middleName: user?.middleName || 'ИВАН',
        lastName: user?.lastName || 'ИВАНОВИЧ',
        role: {label: 'не выбрана', value: ''}, // не изменяется при редактировании
        sex: findSex() || sexOptions[0],
        city: user?.city || 'МИНСК',
        phone: user?.phone || '70000974671',
        birthdate: user?.birthdate?.date || '01.01.2000',
        email: user?.email || 'winteriscoming7@yandex.byeee',
        franchise: {label: 'не выбрана', value: ''}, // не изменяется при редактировании
        tariff: {label: 'не выбран', value: ''} || tariffsOptions[0],
        group: {label: 'не выбрана', value: ''}, // не изменяется при редактировании
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
            selectedRole === Roles.Student
                ? yup.string().notRequired()
                : yup
                    .string()
                    .required('Обязательное поле'),
        /* .matches(REG_PHONE, 'необходим формат 7 ХХХ ХХХ ХХ ХХХ')
        .length(PHONE_LENGTH, `номер должен быть из ${PHONE_LENGTH} цифр`), */
        birthdate: yup.string().required('Обязательное поле'), // todo проверить после добавления dataPicker
        email:
            selectedRole === Roles.Student
                ? yup.string().notRequired()
                : yup.string().required('Обязательное поле').email(),
        franchise: user ? yup.object().notRequired() : yup.object().required('Обязательное поле'),
        tariff:
            selectedRole === Roles.Student
                ? yup.object().required('Обязательное поле')
                : yup.object().notRequired(),
    });

    const {
        handleSubmit,
        control,
        setError,
        resetField,
        reset,
        formState: {errors, isSubmitSuccessful},
    } = useForm<typeof defaultValues>({resolver: yupResolver(schema), defaultValues});

    const onSubmit = handleSubmit(async values => {
        const newUserData: RequestRegister = {
            sex: (values.sex?.label as SexEnum) === SexEnum.Male,
            franchiseId: values.franchise.value,
            birthdate: values.birthdate,
            city: values.city,
            role: values.role.value as Roles,
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            middleName: values.middleName,
            phone: values.phone.replace(/[()\s+-]/g, ""),
            isSecondChild: false,
            tariffId: values.tariff.value,
        };

        await action(
            user,
            removeEmptyFields(newUserData),
            setError,
            values.role.value as Roles,
            onCloseModal,
            reset,
            setStudentId,
            setIsParentShown,
            values.role.value,
            values.franchise.value,
            values.tariff.value,
            values.group.value,
        );
    });

    const getCurrentGroups = (franchiseId: Option) => {
        resetField('group');
        loadCurrentGroups(franchiseId.value, selectedRole);
    };

    useEffect(() => {
        if (selectedRole !== Roles.Student) {
            setIsParentShown(false);
        }

        if (isStudentTeacherEducation(selectedRole)) {
            loadCurrentGroups(franchiseOptions[0].value, selectedRole);
        }

        resetField('franchise');
    }, [selectedRole]);

    return (
        <>
            <h2>Добавление/изменение пользователя</h2>
            <Grid container spacing={{xs: 2, sm: 8, md: 8}} columns={{xs: 2, sm: 12, md: 12}}>
                <Grid item xs={12} sm={5} md={5}>
                    <div className={styles.avatar}>
                        <Image
                            className={styles.imageWrapper}
                            src={avatar}
                            width="290"
                            height="290"
                            alt="student"
                        />
                        {user && <SetStatusButton status={user?.status} id={user.id}/>}
                    </div>
                </Grid>
                <Grid item xs={12} sm={7} md={7}>
                    <div className={styles.table}>
                        <form onSubmit={onSubmit}>
                            <Controller
                                name="middleName"
                                render={({...field}) => {
                                    return <TextFieldCustom
                                        label="Фамилия"
                                        error={errors.middleName?.message}
                                        {...
                                            field
                                        }
                                    />

                                }}
                                control={control}
                            />
                            <Controller
                                name="firstName"
                                render={({field}) => (
                                    <TextFieldCustom label="Имя" error={errors.firstName?.message}{...field} />
                                )}
                                control={control}
                            />
                            <Controller
                                name="lastName"
                                render={({field}) => (
                                    <TextFieldCustom label="Отчество" error={errors.lastName?.message} {...field}/>
                                )}
                                control={control}
                            />
                            {isStudentCreated(isParentShown, studentId) && (
                                <>
                                    <Controller
                                        name="city"
                                        render={({field}) => (
                                            <TextFieldCustom {...field} label="Город" error={errors.city?.message}/>
                                        )}
                                        control={control}
                                    />
                                    {!user && (
                                        <>
                                            <Controller
                                                name="role"
                                                render={({field}) => (
                                                    <CustomSelect
                                                        {...field}
                                                        onChange={e => {
                                                            setSelectedRole(e.value as Roles);
                                                            field.onChange(e);
                                                        }}
                                                        title="Роль"
                                                        options={roleOptions}
                                                        error={errors.role?.message}
                                                    />
                                                )}
                                                control={control}
                                            />
                                            {isMethodistTutor(selectedRole) && (
                                                <Controller
                                                    name="franchise"
                                                    render={({field}) => (
                                                        <CustomSelect
                                                            {...field}
                                                            onChange={e => {
                                                                field.onChange(e);
                                                                getCurrentGroups(e);
                                                                setCurrentFranchiseId(e.value);
                                                            }}
                                                            title="Франшиза"
                                                            options={franchiseOptions}
                                                            error={errors.franchise?.message}
                                                        />
                                                    )}
                                                    control={control}
                                                />
                                            )}
                                        </>
                                    )}
                                    {isStudentRole(selectedRole) && (
                                        <Controller
                                            name="tariff"
                                            render={({field}) => (
                                                <CustomSelect
                                                    {...field}
                                                    onChange={e => {
                                                        field.onChange(e);
                                                    }}
                                                    title="Тариф"
                                                    options={tariffsOptions}
                                                    error={errors.tariff?.message}
                                                />
                                            )}
                                            control={control}
                                        />
                                    )}
                                    {isStudentTeacherEducation(selectedRole) && (
                                        <Controller
                                            name="group"
                                            render={({field}) => (
                                                <CustomSelect
                                                    {...field}
                                                    onChange={e => {
                                                        field.onChange(e);
                                                    }}
                                                    title="Группа"
                                                    options={groupOptions}
                                                    error={errors.group?.message}
                                                />
                                            )}
                                            control={control}
                                        />
                                    )}
                                    {!isStudentRole(selectedRole) && (
                                        <>
                                            <Controller
                                                name="phone"
                                                render={({field}) => (
                                                    <TextFieldPhoneCustom {...field} label="Телефон"
                                                                          error={errors.phone?.message}/>
                                                )}
                                                control={control}
                                            />
                                            <Controller
                                                name="email"
                                                render={({field}) => (
                                                    <TextFieldCustom {...field} label="Почта"
                                                                     error={errors.email?.message}/>
                                                )}
                                                control={control}
                                            />
                                        </>
                                    )}
                                    <Controller
                                        name="birthdate"
                                        render={({field}) => <TextFieldCustom {...field} label="Дата рождения:"/>}
                                        control={control}
                                    />
                                    <Controller
                                        name="sex"
                                        render={({field}) => (
                                            <CustomSelect
                                                {...field}
                                                title="Пол"
                                                options={sexOptions}
                                                error={errors.sex?.message}
                                            />
                                        )}
                                        control={control}
                                    />
                                </>
                            )}
                            <div className={styles.button}>
                                {user && <SetStatusButton status={user?.status} id={user.id}/>}
                                <Button type="submit" disabled={isSubmitSuccessful}>
                                    Сохранить
                                </Button>
                            </div>
                        </form>
                    </div>
                </Grid>
            </Grid>
            {user?.parents && (
                <StudentParentsFormContainer
                    franchiseId={currentFranchiseId}
                    studentId={studentId}
                    onCloseModal={onCloseModal}
                    parents={user.parents}
                />
            )}
            {isParentShown && studentId && (
                <StudentParentsFormContainer
                    franchiseId={currentFranchiseId}
                    studentId={studentId}
                    onCloseModal={onCloseModal}
                />
            )}
        </>
    );
});

export default StudentPageFranchiseeModalAddUser;
