import React, { FC, useState } from 'react';

import franchiseService from '@app/services/franchiseService';
import franchiseStore from '@app/stores/franchiseStore';
import { RequestCreateFranchise } from '@app/types/FranchiseTypes';
import BasicModal from '@components/basic-modal/BasicModal';
import CustomButton from '@components/custom-button/CustomButton';
import styles from '@components/franchising-page/FranchisingPage.module.scss';
import InformationItem from '@components/information-item/InformationItem';
import TextField from '@components/text-field/TextField';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

type Props = {
  showModal: boolean;
  onClose: () => void;
};

const defaultValues: RequestCreateFranchise = {
  fullName: '',
  shortName: '',
  inn: '',
  legalAddress: '',
  actualAddress: '',
  schoolName: '',
  ogrn: '',
  kpp: '',
  checkingAccount: '',
  phone: '',
  email: '',
  city: '',
  bankBill: '',
  bankName: '',
  bankBik: '',
  bankInn: '',
  bankKpp: '',
};

const FranchisingModal: FC<Props> = props => {
  const { showModal, onClose } = props;

  const schema = yup.object().shape({
    fullName: yup.string().required('Обязательное поле'),
    shortName: yup.string().required('Обязательное поле'),
    inn: yup.string().required('Обязательное поле'),
    legalAddress: yup.string().required('Обязательное поле'),
    actualAddress: yup.string().required('Обязательное поле'),
    schoolName: yup.string().required('Обязательное поле'),
    ogrn: yup.string().required('Обязательное поле'),
    kpp: yup.string().required('Обязательное поле'),
    checkingAccount: yup.string().required('Обязательное поле'),
    phone: yup.string().required('Обязательное поле'),
    email: yup.string().required('Обязательное поле'),
    city: yup.string().required('Обязательное поле'),
    bankBill: yup.string().required('Обязательное поле'),
    bankName: yup.string().required('Обязательное поле'),
    bankBik: yup.string().required('Обязательное поле'),
    bankInn: yup.string().required('Обязательное поле'),
    bankKpp: yup.string().required('Обязательное поле'),
  });
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), defaultValues });

  const onSaveClick = async (values: RequestCreateFranchise) => {
    try {
      await franchiseStore.createFranchise(values);
      reset();
      onClose();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <BasicModal visibility={showModal} changeVisibility={onClose}>
      <div className={styles.modalWrap}>
        <div className={styles.modalContent}>
          <div>
            <Controller
              name="fullName"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Полное наименование"
                  error={errors.fullName?.message}
                />
              )}
              control={control}
            />
            <Controller
              name="shortName"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Короткое наименование"
                  error={errors.shortName?.message}
                />
              )}
              control={control}
            />
            <Controller
              name="inn"
              render={({ field }) => (
                <TextField {...field} label="ИНН" error={errors.inn?.message} />
              )}
              control={control}
            />
            <Controller
              name="legalAddress"
              render={({ field }) => (
                <TextField {...field} label="Юр. адрес" error={errors.legalAddress?.message} />
              )}
              control={control}
            />
            <Controller
              name="actualAddress"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Фактический адрес"
                  error={errors.actualAddress?.message}
                />
              )}
              control={control}
            />
            <Controller
              name="schoolName"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Наименование школы"
                  error={errors.schoolName?.message}
                />
              )}
              control={control}
            />
            <Controller
              name="ogrn"
              render={({ field }) => (
                <TextField {...field} label="ОГРН" error={errors.ogrn?.message} />
              )}
              control={control}
            />
            <Controller
              name="kpp"
              render={({ field }) => (
                <TextField {...field} label="КПП" error={errors.kpp?.message} />
              )}
              control={control}
            />
            <Controller
              name="checkingAccount"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Расчётный счёт"
                  error={errors.checkingAccount?.message}
                />
              )}
              control={control}
            />
          </div>
          <div>
            <Controller
              name="phone"
              render={({ field }) => (
                <TextField {...field} label="Телефон" error={errors.phone?.message} />
              )}
              control={control}
            />
            <Controller
              name="email"
              render={({ field }) => (
                <TextField {...field} label="E-mail" error={errors.email?.message} />
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
              name="bankName"
              render={({ field }) => (
                <TextField {...field} label="Наименование банка" error={errors.bankName?.message} />
              )}
              control={control}
            />
            <Controller
              name="bankBill"
              render={({ field }) => (
                <TextField {...field} label="Корр. счёт банка" error={errors.bankBill?.message} />
              )}
              control={control}
            />
            <Controller
              name="bankBik"
              render={({ field }) => (
                <TextField {...field} label="БИК банка" error={errors.bankBik?.message} />
              )}
              control={control}
            />
            <Controller
              name="bankInn"
              render={({ field }) => (
                <TextField {...field} label="ИНН банка" error={errors.bankInn?.message} />
              )}
              control={control}
            />
            <Controller
              name="bankKpp"
              render={({ field }) => (
                <TextField {...field} label="КПП банка" error={errors.bankKpp?.message} />
              )}
              control={control}
            />
          </div>
        </div>
        <div className={styles.btnBlock}>
          {/* <div className={styles.deleteBtn}> */}
          {/*  <CustomButton onClick={() => console.log('Сохранить')}>Удалить</CustomButton> */}
          {/* </div> */}
          <CustomButton onClick={handleSubmit(onSaveClick)}>Сохранить</CustomButton>
        </div>
      </div>
    </BasicModal>
  );
};

export default FranchisingModal;
