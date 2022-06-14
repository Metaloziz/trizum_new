import React, { FC } from 'react';

import Button from '@components/custom-button/CustomButton';
import {useRouter} from "next/router";
import {Routes} from "@constants/Routes";

type Props = Record<string, unknown>;

const MethodistMain: FC<Props> = props => {

  const onAddTest = () =>{

  }
  return (
    <div>
      <Button onClick={onAddTest}>Добавить тест</Button>
    </div>
  );
};

export default MethodistMain;
