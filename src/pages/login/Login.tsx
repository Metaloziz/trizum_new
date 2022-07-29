import React, { useState, useEffect } from 'react';

import { Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';

import styles from './Login.module.scss';

import { AppRoutes } from 'app/enums/AppRoutes';
import authService from 'app/services/authService';
import tokenService from 'app/services/tokenService';
import appStore, { Roles } from 'app/stores/appStore';
import BasicModal from 'components/basic-modal/BasicModal';
import Button from 'components/button/Button';
import RoleButtons from 'components/role-buttons/RoleButtons';

const func = (isTester: boolean, isAnalytic: boolean) => {
  if (isTester) return '7970';
  if (isAnalytic) return '7930';
  return '7960';
};

const Login = () => {
  const [isTester, setIsTester] = useState(false);
  const [isAnalytic, setIsAnalytic] = useState(false);
  const resetRole = () => {
    setIsAnalytic(false);
    setIsTester(false);
  };
  const [phone, setPhone] = useState('79601001010');
  const qwe = (role: Roles) => {
    switch (role) {
      case Roles.Student:
        setPhone(`${func(isTester, isAnalytic)}8008080`);
        break;
      case Roles.TeacherEducation:
        setPhone(`${func(isTester, isAnalytic)}7007070`);
        break;
      case Roles.Teacher:
        setPhone(`${func(isTester, isAnalytic)}6006060`);
        break;
      case Roles.FranchiseeAdmin:
        setPhone(`${func(isTester, isAnalytic)}5005050`);
        break;
      case Roles.Franchisee:
        setPhone(`${func(isTester, isAnalytic)}4004040`);
        break;
      case Roles.Methodist:
        setPhone(`${func(isTester, isAnalytic)}3003030`);
        break;
      case Roles.Tutor:
        setPhone(`${func(isTester, isAnalytic)}2002020`);
        break;
      case Roles.Admin:
        setPhone(`${func(isTester, isAnalytic)}1001010`);
        break;
      default:
        setPhone('79601001010');
    }
  };
  const onClick = async () => {
    try {
      const res1 = await authService.sms({ phone });
      const res2 = await authService.login({ phone, smsCode: res1.code });
      await tokenService.setUser(res2.data.token);
      await appStore.setUser();
      // const userData = await authService.loadme();
      // appStore.setRole(userData.role as Roles);
    } catch (e) {
      console.warn(e);
    }
  };
  const [code, setCode] = useState<string>('');
  const [showModal1, setShowModal1] = useState<boolean>(false);
  const [showModal2, setShowModal2] = useState<boolean>(false);
  const [showmodal, setShowModal] = useState<boolean>(true);
  const [erorr, setErorr] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(150);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  useEffect(() => {
    if (seconds > 0 && timerActive) {
      setTimeout(setSeconds, 150, seconds - 1);
    } else {
      setTimerActive(false);
    }
  }, [seconds, timerActive]);

  const sendPhone = async () => {
    setShowModal1(false);
    setShowModal2(true);
    setShowModal(false);
    setSeconds(140);
    setTimerActive(!timerActive);
    const getSMSCode = await authService.sms({ phone });
    console.log('код по смс', getSMSCode);
  };
  const sendCode = async () => {
    try {
      const getToken = await authService.login({ phone, smsCode: Number(code) });
      await tokenService.setUser(getToken.data.token);
      await appStore.setUser();
      // const userData = await authService.loadme();
      // appStore.setRole(userData.role as Roles);
    } catch (e) {
      console.warn(e);
      setErorr(true);
    }
  };

  const repeatSMSCode = async () => {
    setSeconds(150);
    setTimerActive(!timerActive);
    const getSMSCode = await authService.sms({ phone });
    console.log('повторный код по смс', getSMSCode);
  };
  const sec = Math.round(seconds / 10);

  const anotherNumber = () => {
    setShowModal1(true);
    setShowModal2(false);
    setShowModal(true);
    setTimerActive(false);
    setErorr(false);
  };
  function filterWords(
    number: number,
    one: string | number,
    two: string | number,
    five: string | number,
  ) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return five;
    }
    n %= 10;
    if (n === 1) {
      return one;
    }
    if (n >= 2 && n <= 4) {
      return two;
    }
    return five;
  }
  if (appStore.role !== Roles.Unauthorized) {
    return <Navigate to={AppRoutes.Index} />;
  }
  return (
    <div className={styles.flex}>
      {showModal1 || showModal2 ? null : <RoleButtons onClick={qwe} />}
      <div className={styles.flexCol}>
        <Button variant="none" onClick={() => setIsAnalytic(true)}>
          Кнопка для аналитика
        </Button>
        Кнопка для тестировщика
        <Button variant="none" onClick={() => setIsTester(true)} />
        <Button variant="none" onClick={resetRole}>
          Сброс номера на основной
        </Button>
        <p style={{ maxWidth: 300, textAlign: 'center' }}>
          Сначала нажимаем на нужную роль (Аналитик или Тестировщик), потом выбираем роль для
          приложения, потом жмем на логин. Ошиблись ролью - нажать на сброс и выбрать нужную.
        </p>
        <Button onClick={onClick}>login</Button>
        <Button variant="addUser" onClick={() => setShowModal1(true)}>
          Модалка временно для логина
        </Button>
      </div>
      <BasicModal visibility={showModal1} changeVisibility={setShowModal1}>
        <div className={styles.wrapContent}>
          <div>
            <p className={styles.modalTitle}>Авторизация</p>
            <p className={styles.modalSubtitle}>Ваш номер телефона</p>
            <div>
              <input value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <div>
              <button type="submit" className={styles.modalButton} onClick={sendPhone}>
                Войти
              </button>
            </div>
          </div>
        </div>
      </BasicModal>
      <BasicModal visibility={showModal2} changeVisibility={setShowModal2}>
        <div className={styles.wrapContent}>
          <div>
            <p>Ваш телефон</p>
            <div className={styles.phoneContainer}>
              <span>+{phone}</span>
            </div>
            <p>Временный код</p>
          </div>
          <div className={styles.inputContainer}>
            <input type="tel" value={code} onChange={e => setCode(e.target.value)} />
          </div>
          {erorr ? (
            <p className={styles.textErorrRed}>
              Неверный код
              <br />
              После трёх неверных попыток - блокировка.
            </p>
          ) : (
            <div className={styles.blockErorr} />
          )}
          <div>
            <Button onClick={sendCode}>Отправить</Button>
            <div>
              {seconds !== 150 && seconds !== 0 ? (
                <p className={styles.textErorr}>
                  Сообщение отправлено. Повторно вы сможете запросить код через {`${sec} `}
                  {filterWords(sec, 'секунду', 'секунды', 'секунд')}.
                </p>
              ) : (
                <p onClick={repeatSMSCode} className={styles.underlined}>
                  Выслать код повторно
                </p>
              )}
            </div>
            <p onClick={anotherNumber} className={styles.anotherNumber}>
              Ввести другой номер
            </p>
          </div>
        </div>
      </BasicModal>
    </div>
    //
    //
    //
    //
    // <div className={styles.modal}>
    //   <div className={styles.content}>
    //     {showmodal ? (
    //       <div className={styles.wrapContent}>
    //         <div>
    //           <p className={styles.modalTitle}>Авторизация</p>
    //           <p className={styles.modalSubtitle}>Ваш номер телефона</p>
    //           <div>
    //             <input value={phone} onChange={e => setPhone(e.target.value)} />
    //           </div>
    //           <div>
    //             <button type="submit" className={styles.modalButton} onClick={sendPhone}>
    //               Войти
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     ) : (
    //       <div className={styles.wrapContent}>
    //         <div>
    //           <p>Ваш телефон</p>
    //           <div className={styles.phoneContainer}>
    //             <span>+{phone}</span>
    //           </div>
    //           <p>Временный код</p>
    //         </div>
    //         <div className={styles.inputContainer}>
    //           <input type="tel" value={code} onChange={e => setCode(e.target.value)} />
    //         </div>
    //         {erorr ? (
    //           <p className={styles.textErorr}>
    //             Неверный код
    //             <br />
    //             После трёх неверных попыток - блокировка.
    //           </p>
    //         ) : (
    //           <div className={styles.blockErorr} />
    //         )}
    //         <div>
    //           <Button onClick={sendCode}>Подтвердить изменения</Button>
    //           <div>
    //             {seconds === 150 || seconds === 0 ? (
    //               <p onClick={repeatSMSCode} className={styles.underlined}>
    //                 Выслать код повторно
    //               </p>
    //             ) : (
    //               <p className={styles.textErorr}>
    //                 Сообщение отправлено. Повторно вы сможете запросить код через {sec} секунд.
    //               </p>
    //             )}
    //           </div>
    //             <p onClick={anotherNumber} className={styles.anotherNumber}>
    //             Ввести другой номер
    //           </p>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
};

export default Login;
