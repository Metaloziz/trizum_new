import React, { FC } from 'react';

import styles from './addVariant.module.scss';

import { AnswerT } from 'app/types/CourseTypes';
import checked from 'assets/svgs/checked.svg';
import isCheck from 'assets/svgs/completedChecked.svg';
import { stateVariantType } from 'components/add-test-page/AddTest';
import Image from 'components/image/Image';
import InformationItem from 'components/information-item/InformationItem';

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
