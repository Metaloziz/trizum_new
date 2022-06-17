import React from 'react';

import { stateVariantType } from '@components/add-test-page/AddTest';
import InformationItem from '@components/information-item/InformationItem';
import checked from '@svgs/checked.svg';
import isCheck from '@svgs/completedChecked.svg';
import Image from 'next/image';

import styles from './addVariant.module.scss';

type ArrayItemProps = stateVariantType & {
  handlerVariant: (id: number, value: string) => void;
  handleChecked: (id: number, isChecked: boolean) => void;
};

const AddVariantItem = ({
  id,
  completed,
  value,
  handlerVariant,
  handleChecked,
}: ArrayItemProps) => {
  const onClickChecked = () => {
    handleChecked(id, !completed);
  };

  return (
    <div className={styles.variant}>
      <div className={styles.answer}>
        <InformationItem
          title="Вариант ответа"
          variant="input"
          value={value}
          onChange={e => handlerVariant(id, e)}
        />
        <button className={styles.checkBox} onClick={onClickChecked}>
          <Image src={completed ? isCheck : checked} alt="checked" />
          {/* <Checked/> */}
        </button>
      </div>
    </div>
  );
};

export default AddVariantItem;
