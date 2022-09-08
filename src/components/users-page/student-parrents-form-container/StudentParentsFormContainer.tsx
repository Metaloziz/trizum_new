import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';

import style from './StudentParentsFormContainer.module.scss';

import { ParentT } from 'app/types/UserTypes';
import ButtonAddParent from 'components/users-page/button-add-parent/ButtonAddParent';
import styles from 'components/users-page/student-page-franchisee-modal-add-user/StudentPageFranchiseeModalAddUser.module.scss';
import StudentParentsForm from 'components/users-page/student-parents-form/StudentParentsForm';
import {
  MAX_PARENTS_COUNT,
  ParentsFormStateType,
  setInitialState,
} from 'components/users-page/student-parrents-form-container/store/store';
import { isSubmitAnyForm } from 'components/users-page/student-parrents-form-container/utils/isSubmitAnyForm';

type Props = {
  studentId: string;
  franchiseId: string;
  onCloseModal: () => void;
  parents?: ParentT[];
};

export const StudentParentsFormContainer: FC<Props> = observer(
  ({ onCloseModal, studentId, parents, franchiseId }) => {
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

    const setSuccessForm = (isSuccess: boolean, idForm: number) => {
      const newState = parentState.map(form =>
        form.id === idForm ? { ...form, isSuccessSubmit: isSuccess } : form,
      );
      setParentState(newState);

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

    // useEffect(() => {
    //   if (
    //     parentState.length === MAX_PARENTS_COUNT &&
    //     parentState[MAX_PARENTS_COUNT - 1].isSuccessSubmit
    //   ) {
    //     onCloseModal();
    //   }
    // });

    return (
      <div>
        <h2 className={styles.parentTitle}>Родители ученика*</h2>
        <div className={style.wrapper}>
          <div className={style.forms}>
            {parentState.map(({ id, isMain, parent }) => (
              <StudentParentsForm
                key={id}
                localParentFormID={id}
                isMainParent={isMain}
                setIsMainParent={setIsMainParent}
                studentId={studentId}
                franchiseId={franchiseId}
                setIsSubmitSuccessful={setSuccessForm}
                parent={parent}
                isSubmitAnyForm={isSubmitAnyForm(parentState)}
              />
            ))}
          </div>
          {/* <ButtonAddParent onClick={addForm} disabled={parentState.length === MAX_PARENTS_COUNT} /> */}
        </div>
      </div>
    );
  },
);
