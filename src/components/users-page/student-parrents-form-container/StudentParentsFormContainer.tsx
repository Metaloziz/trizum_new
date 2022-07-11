import React, { FC, useEffect, useState } from 'react';

import style from './StudentParentsFormContainer.module.scss';

import ButtonAddParent from 'components/users-page/button-add-parent/ButtonAddParent';
import StudentParentsForm from 'components/users-page/student-parents-form/StudentParentsForm';

type Props = {
  studentId: string;
  onCloseModal: () => void;
};

type ParentsFormStateType = {
  id: number;
  isSuccessSubmit: boolean;
  isMain: boolean;
};

const MAX_PARENTS_COUNT = 3;

const INITIAL_PARENT_FORM_STATE: ParentsFormStateType[] = [
  {
    id: 1,
    isSuccessSubmit: false,
    isMain: true,
  },
];

export const StudentParentsFormContainer: FC<Props> = ({ onCloseModal, studentId }) => {
  const [parentState, setParentState] = useState(INITIAL_PARENT_FORM_STATE);

  const addForm = () => {
    const form: ParentsFormStateType = {
      id: parentState.length + 1,
      isSuccessSubmit: false,
      isMain: false,
    };
    const newState = [...parentState, form];
    setParentState(newState);
  };

  const setIsSuccess = (isSuccess: boolean, id: number) => {
    setParentState(
      parentState.map(form =>
        form.id === id
          ? {
              ...form,
              isSuccessSubmit: isSuccess,
            }
          : form,
      ),
    );

    if (parentState.length < MAX_PARENTS_COUNT) {
      addForm();
    }
  };

  const setIsMainParent = (isMain: boolean, id: number) => {
    setParentState(
      parentState.map(form =>
        form.id === id
          ? {
              ...form,
              isMain,
            }
          : { ...form, isMain: false },
      ),
    );
  };

  useEffect(() => {
    if (
      parentState.length === MAX_PARENTS_COUNT &&
      parentState[MAX_PARENTS_COUNT - 1].isSuccessSubmit
    ) {
      onCloseModal();
    }
  });

  return (
    <div className={style.wrapper}>
      <div className={style.forms}>
        {parentState.map(({ id, isMain }) => (
          <StudentParentsForm
            key={id}
            id={id}
            isMainParent={isMain}
            setIsMainParent={setIsMainParent}
            studentId={studentId}
            setIsSubmitSuccessful={setIsSuccess}
          />
        ))}
      </div>
      <ButtonAddParent onClick={addForm} disabled={parentState.length === MAX_PARENTS_COUNT} />
    </div>
  );
};
