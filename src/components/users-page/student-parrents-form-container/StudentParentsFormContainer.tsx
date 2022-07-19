import React, { FC, useEffect, useState } from 'react';

import style from './StudentParentsFormContainer.module.scss';

import { ParentT } from 'app/types/UserTypes';
import { Divider } from 'components/divider/Divider';
import ButtonAddParent from 'components/users-page/button-add-parent/ButtonAddParent';
import styles from 'components/users-page/student-page-franchisee-modal-add-user/StudentPageFranchiseeModalAddUser.module.scss';
import StudentParentsForm from 'components/users-page/student-parents-form/StudentParentsForm';

type Props = {
  studentId: string;
  onCloseModal: () => void;
  parents?: ParentT[];
};

type ParentsFormStateType = {
  id: number;
  isSuccessSubmit: boolean;
  isMain: boolean;
  parent?: ParentT;
};

const MAX_PARENTS_COUNT = 3;

const INITIAL_PARENT_FORM_STATE: ParentsFormStateType[] = [
  {
    id: 1,
    isSuccessSubmit: false,
    isMain: true,
  },
];

const setInitialState = (parents?: ParentT[]): ParentsFormStateType[] => {
  if (parents) {
    return parents.map((parent, index) => ({
      id: index + 1,
      isSuccessSubmit: false,
      isMain: parent.isMain,
      parent,
    }));
  }
  return INITIAL_PARENT_FORM_STATE;
};

export const StudentParentsFormContainer: FC<Props> = ({ onCloseModal, studentId, parents }) => {
  const [parentState, setParentState] = useState(() => setInitialState(parents));

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
    <div>
      <Divider />
      <h2 className={styles.parentTitle}>Родители ученика*</h2>
      <div className={style.wrapper}>
        <div className={style.forms}>
          {parentState.map(({ id, isMain, parent }) => (
            <StudentParentsForm
              key={id}
              id={id}
              isMainParent={isMain}
              setIsMainParent={setIsMainParent}
              studentId={studentId}
              setIsSubmitSuccessful={setIsSuccess}
              parent={parent}
            />
          ))}
        </div>
        <ButtonAddParent onClick={addForm} disabled={parentState.length === MAX_PARENTS_COUNT} />
      </div>
    </div>
  );
};
