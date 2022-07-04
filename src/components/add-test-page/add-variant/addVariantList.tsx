import React from 'react';

import { AnswerT } from 'app/types/CourseTypes';
import AddVariantItem from 'components/add-test-page/add-variant/addVariantItem';

type ArrayItem = {
  id: number;
  completed: boolean;
  value: string;
};

type VariantListType = {
  items: AnswerT[];
  handlerVariant: (value: string) => void;
  handleChecked: (value: string, isChecked: boolean) => void;
};

const AddVariantList = ({ items, handlerVariant, handleChecked }: VariantListType) => (
  <div>
    {items.map(({ correct, text }) => (
      <AddVariantItem
        key={text}
        correct={correct}
        text={text}
        handlerVariant={handlerVariant}
        handleChecked={handleChecked}
      />
    ))}
  </div>
);

export default AddVariantList;
