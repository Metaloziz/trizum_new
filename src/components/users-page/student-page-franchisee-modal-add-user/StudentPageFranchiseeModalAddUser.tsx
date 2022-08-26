import React, {FC, useEffect, useState} from 'react';

import {yupResolver} from '@hookform/resolvers/yup';
import {Box, FormControl, Grid, TextField, Typography} from '@mui/material';
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
import {DatePicker} from "@mui/x-date-pickers/DatePicker";

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

    const findSex = () => (user?.sex ? sexOptions[0].value : sexOptions[1].value);

    const defaultValues = {
        firstName: user?.firstName || 'ИВАНОВ',
        middleName: user?.middleName || 'ИВАН',
        lastName: user?.lastName || 'ИВАНОВИЧ',
        role:  '', // не изменяется при редактировании
        sex: findSex() || sexOptions[0].value,
        city: user?.city || 'МИНСК',
        phone: user?.phone || '70000974671',
        birthdate: user?.birthdate?.date || '01.01.2000',
        email: user?.email || 'winteriscoming7@yandex.byeee',
        franchise: '', // не изменяется при редактировании
        tariff: '' || tariffsOptions[0].value,
        group:  '', // не изменяется при редактировании
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
        role: user ? yup.string().notRequired() : yup.string().required('Обязательное поле'),
        sex: yup.string().required('Обязательное поле'),
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
        franchise: user ? yup.string().notRequired() : yup.string().required('Обязательное поле'),
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
        formState: {errors, isSubmitSuccessful},
    } = useForm<typeof defaultValues>({resolver: yupResolver(schema), defaultValues});

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
            phone: values.phone.replace(/[()\s+-]/g, ""),
            isSecondChild: false,
            tariffId: values.tariff,
        };

        await action(
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

    const getCurrentGroups = (value: string) => {
        resetField('group');
        loadCurrentGroups(value, selectedRole);
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
            <form onSubmit={onSubmit}>
            <Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography className={styles.tableTitle} variant="h5">{user ? 'Редактирование пользователя' : 'Регистрация пользователя'}</Typography>
                </Grid>
                    {/* <div className={styles.table}> */}
                            <Grid item xs={12} sm={6}>
                            <Controller
                                name="middleName"
                                render={({field}) => (
                                    <TextFieldCustom
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
                                render={({field}) => (
                                    <TextFieldCustom label="Имя" error={errors.firstName?.message}{...field} />
                                )}
                                control={control}
                            />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <Controller
                                name="lastName"
                                render={({field}) => (
                                    <TextFieldCustom label="Отчество" error={errors.lastName?.message} {...field}/>
                                )}
                                control={control}
                            />
                            </Grid>
                            {isStudentCreated(isParentShown, studentId) && (
                                <>
                                    <Grid item xs={12} sm={6}>
                                    <Controller
                                        name="city"
                                        render={({field}) => (
                                            <TextFieldCustom {...field} label="Город" error={errors.city?.message}/>
                                        )}
                                        control={control}
                                    />
                                    </Grid>
                                    {!user && (
                                        <>
                                            <Grid item xs={12} sm={6}>
                                            <Controller
                                                name="role"
                                                render={({field}) => (
                                                    <CustomSelect

                                                        {...field}
                                                        onChange={e => {
                                                            console.log(field)
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
                                                    render={({field}) => (
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
                                        </Grid>
                                    )}
                                    {isStudentTeacherEducation(selectedRole) && (
                                        <Grid item xs={12} sm={6}>
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
                                        </Grid>
                                    )}
                                    {!isStudentRole(selectedRole) && (
                                        <>
                                            <Grid item xs={12} sm={6}>
                                            <Controller
                                                name="phone"
                                                render={({field}) => (
                                                    <TextFieldPhoneCustom {...field} label="Телефон"
                                                                          error={errors.phone?.message}/>
                                                )}
                                                control={control}
                                            />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                            <Controller
                                                name="email"
                                                render={({field}) => (
                                                    <TextFieldCustom {...field} label="Почта"
                                                                     error={errors.email?.message}/>
                                                )}
                                                control={control}
                                            />
                                            </Grid>
                                        </>
                                    )}
                                    <Grid item xs={12} sm={6}>
                                    <Controller
                                        name="birthdate"
                                        render={({field}) => (
                                            <FormControl fullWidth>
                                                <DatePicker
                                                    onChange={
                                                        (date: Date | null) => {
                                                            field.onChange(date);
                                                        }
                                                    }

                                                    value={field.value}
                                                    renderInput={e =>
                                                        <TextField {...e} sx={{width: '100%'}}
                                                                   error={!!errors.birthdate?.message}
                                                                   helperText={errors.birthdate?.message}
                                                                   /* size="small" */
                                                        />}
                                                />
                                            </FormControl>
                                        )}
                                        control={control}
                                    />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
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
                                    </Grid>
                                </>
                            )}
                            {/* <div className={styles.button}> */}
                            <Grid item xs={12} sm={6}>
                                {user && <SetStatusButton status={user?.status} id={user.id}/>}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button type="submit" disabled={isSubmitSuccessful}>
                                    Сохранить
                                </Button>
                            </Grid>
                            {/* </div> */}

                   {/* </div> */}
            </Grid>
            </Box>
        </form>
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
