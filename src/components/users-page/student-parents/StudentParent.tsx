import React, { ChangeEvent, FC, useState } from 'react';

import styles from './StudentParents.module.scss';

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
import TextField from 'components/text-field/TextField';
import user from 'public/svgs/user.svg';

const sexOptions = Object.values(SexEnum).map(el => ({ label: el, value: el }));

type Props = {
  studentId: string;
  onCloseModal: () => void;
};

const StudentParents: FC<Props> = props => {
  const { onCloseModal, studentId } = props;
  const [currentRadioValue, setCurrentRadioValue] = useState('inputChoice1');
  const handlerRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentRadioValue(e.currentTarget.value);
  };

  const [name, setName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [sex, setSex] = useState<Option>(sexOptions[0]);
  const [birthdate, setBirthdate] = useState('');

  const onAddParent = async () => {
    const data: RequestRegister = {
      sex: (sex.label as SexEnum) === SexEnum.Male,
      phone,
      middleName,
      city,
      lastName,
      firstName: name,
      franchiseId: '1ecf563a-2a69-6610-a812-f92a3af0f8be',
      email,
      birthdate,
      role: Roles.Parent,
      isSecondChild: false,
    };

    const res = await usersStore.createUser(data);
    if (res) {
      const qwe: RequestParenting = {
        parentId: res.id,
        childId: studentId,
        isMain: true,
      };
      const asd = await usersStore.createParenting(qwe);
      onCloseModal();
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
        <TextField onChange={e => setName(e.target.value)} value={name} label="Имя" />
        <TextField
          onChange={e => setMiddleName(e.target.value)}
          value={middleName}
          label="Фамилия"
        />
        <TextField onChange={e => setLastName(e.target.value)} value={lastName} label="Отчество" />
        <TextField onChange={e => setCity(e.target.value)} value={city} label="Город" />
        <TextField onChange={e => setPhone(e.target.value)} value={phone} label="Телефон" />
        <TextField onChange={e => setEmail(e.target.value)} value={email} label="Email" />
        <TextField
          onChange={e => setBirthdate(e.target.value)}
          value={birthdate}
          label="Дата рождения"
        />
        <CustomSelect onChange={e => setSex(e)} value={sex} title="Пол" options={sexOptions} />

        <div className={styles.selectWrapper}>
          <div className={styles.label}>
            <label>
              <input
                type="radio"
                value="inputChoice1"
                id="inputChoice1"
                name="currentRadioValue"
                onChange={handlerRadioChange}
                checked={currentRadioValue === 'inputChoice1'}
              />
              Основной
            </label>
            <div className={styles.medal}>
              <Image src={iconMedal} width="20" height="20" alt="medal" />
            </div>
            <Button onClick={onAddParent}>Сохранить</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentParents;
