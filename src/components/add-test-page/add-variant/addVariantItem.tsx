import React, { FC } from 'react';

import { AnswerT } from '@app/types/CourseTypes';
import { stateVariantType } from '@components/add-test-page/AddTest';
import InformationItem from '@components/information-item/InformationItem';
import checked from '@svgs/checked.svg';
import isCheck from '@svgs/completedChecked.svg';
import Image from 'next/image';

import styles from './addVariant.module.scss';

type ArrayItemProps = AnswerT & {
  handlerVariant: (value: string) => void;
  handleChecked: (text: string, isChecked: boolean) => void;
};

const AddVariantItem: FC<ArrayItemProps> = props => {
  const { handlerVariant, handleChecked, text, correct } = props;
  const onClickChecked = () => {
    handleChecked(text, correct);
  };

  return (
    <div className={styles.variant}>
      <div className={styles.answer}>
        <InformationItem
          title="Вариант ответа"
          variant="input"
          value={text}
          onChange={e => handlerVariant(e)}
        />
        <button className={styles.checkBox} onClick={onClickChecked}>
          <Image src={correct ? isCheck : checked} alt="checked" />
          {/* <Checked/> */}
        </button>
      </div>
    </div>
  );
};

export default AddVariantItem;
