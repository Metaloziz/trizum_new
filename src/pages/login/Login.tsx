import React, { useState } from 'react';

import styles from './Login.module.scss';

import authService from 'app/services/authService';
import tokenService from 'app/services/tokenService';
import appStore, { Roles } from 'app/stores/appStore';
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

  return (
    <div className={styles.flex}>
      <RoleButtons onClick={qwe} />
      <div className={styles.flexCol}>
        <Button onClick={onClick}>login</Button>
        {/* <input type="text" value={phone} onChange={e => setPhone(e.target.value)} /> */}
      </div>
    </div>
  );
};

export default Login;
