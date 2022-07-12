import React, { useState, useEffect } from 'react';

import styles from './Login.module.scss';

import authService from 'app/services/authService';
import tokenService from 'app/services/tokenService';
import appStore, { Roles } from 'app/stores/appStore';
import BasicModal from 'components/basic-modal/BasicModal';
import Button from 'components/button/Button';
import RoleButtons from 'components/role-buttons/RoleButtons';

const Login = () => {
  const [phone, setPhone] = useState('79001001010');
  const qwe = (role: Roles) => {
    switch (role) {
      case Roles.Student:
        setPhone('79008008080');
        break;
      case Roles.TeacherEducation:
        setPhone('79007007070');
        break;
      case Roles.Teacher:
        setPhone('79006006060');
        break;
      case Roles.FranchiseeAdmin:
        setPhone('79005005050');
        break;
      case Roles.Franchisee:
        setPhone('79004004040');
        break;
      case Roles.Methodist:
        setPhone('79003003030');
        break;
      case Roles.Tutor:
        setPhone('79002002020');
        break;
      case Roles.Admin:
        setPhone('79001001010');
        break;
      default:
        setPhone('');
    }
  };
  const onClick = async () => {
    try {
      const res1 = await authService.sms({ phone });
      const res2 = await authService.login({ phone, smsCode: res1.code });
      await tokenService.setUser(res2.data.token);
      const userData = await authService.loadme();
      appStore.setRole(userData.role as Roles);
    } catch (e) {
      console.warn(e);
    }
  };
  const [code, setCode] = useState<string>('');
  const [showModal1, setShowModal1] = useState<boolean>(false);
  const [showModal2, setShowModal2] = useState<boolean>(false);
  const [showmodal, setShowModal] = useState<boolean>(true);
  const [erorr, setErorr] = useState<boolean>(false);
  
  const sendPhone = async () => {
    setShowModal1(false);
    setShowModal2(true);
    setShowModal(false);
    const getSMSCode = await authService.sms({ phone });
    console.log('код по смс', getSMSCode);
  };
  const sendCode = async () => {
    try {
      const getToken = await authService.login({ phone, smsCode: Number(code) });
      await tokenService.setUser(getToken.data.token);
      const userData = await authService.loadme();
      appStore.setRole(userData.role as Roles);
    } catch (e) {
      console.warn(e);
      setErorr(true);
    }
  };

  const [seconds, setSeconds] = useState<number>(150);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  useEffect(() => {
    if (seconds > 0 && timerActive) {
      setTimeout(setSeconds, 150, seconds - 1);
    } else {
      setTimerActive(false);
    }
  }, [seconds, timerActive]);
  const repeatSMSCode = async () => {
    setSeconds(150);
    setTimerActive(!timerActive);
    const getSMSCode = await authService.sms({ phone });
    console.log('повторный код по смс', getSMSCode);
  };

  const sec = Math.round(seconds / 10);
  return (
    <div className={styles.flex}>
      {showModal1 || showModal2 ? null : <RoleButtons onClick={qwe} />}
      <div className={styles.flexCol}>
        <Button onClick={onClick}>login</Button>
        <Button type="addUser" onClick={() => setShowModal1(true)}>
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
            <p className={styles.textErorr}>
              Неверный код
              <br />
              После трёх неверных попыток - блокировка.
            </p>
          ) : (
            <div className={styles.blockErorr} />
          )}
          <div>
            <Button onClick={sendCode}>Подтвердить изменения</Button>
            <div>
              {seconds === 150 || seconds === 0 ? (
                <p onClick={repeatSMSCode} className={styles.underlined}>
                  Выслать код повторно
                </p>
              ) : (
                <p className={styles.textErorr}>
                  Сообщение отправлено. Повторно вы сможете запросить код через {sec} секунд.
                </p>
              )}
            </div>
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
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
};

export default Login;
