import Image from 'next/image';
import React, { FC } from 'react';
import avatar from '@images/avatar.png';
import styles from './UserCard.module.scss';

type Props = {
  fullName: string;
  status: string;
  city: string;
};

const UserCard: FC<Props> = (props) => {
  const { fullName, status, city } = props;
  return (
    <div className={styles.card}>
      <span className={styles.avatar}>
        <Image src={avatar} width={50} height={50} alt="avatar" />
      </span>
     <div className={styles.info}>
       <div className={styles.name}>{fullName}</div>
       <div>
         Статус: <span>{status}</span>
       </div>
       <div>
         Город: <span>{city}</span>
       </div>
     </div>
    </div>
  );
};

export default UserCard;
