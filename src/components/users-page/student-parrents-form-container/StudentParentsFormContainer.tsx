import { observer } from 'mobx-react-lite';
import React, { FC, useState } from 'react';

import style from './StudentParentsFormContainer.module.scss';

import { ParentT, ResponseParenting } from 'app/types/UserTypes';
import ButtonAddParent from 'components/users-page/button-add-parent/ButtonAddParent';
import styles from 'components/users-page/student-page-franchisee-modal-add-user/StudentPageFranchiseeModalAddUser.module.scss';
import StudentParentsForm from 'components/users-page/student-parents-form/StudentParentsForm';
import {
  MAX_PARENTS_COUNT,
  ParentsFormStateType,
  setInitialState,
} from 'components/users-page/student-parrents-form-container/store/store';
import usersStore from 'app/stores/usersStore';

type Props = {
  studentId: string;
  franchiseId: string;
  onCloseModal: () => void;
  parents?: ParentT[];
  visibility?: boolean;
  isViewMode?: boolean;
};

export const StudentParentsFormContainer: FC<Props> = observer(
  ({ onCloseModal, studentId, parents, franchiseId, visibility, isViewMode }) => {
    const [parentState, setParentState] = useState(() => setInitialState(parents));

    const { updateParenting } = usersStore;

    const addForm = () => {
      const form: ParentsFormStateType = {
        localParentFormId: parentState.length + 1,
        isSuccessSubmit: false,
        isMain: false,
      };
      const newState = [...parentState, form];
      setParentState(newState);
    };

    const setSuccessForm = (
      isSuccess: boolean,
      localParentFormId: number,
      parentingData?: ResponseParenting,
    ) => {
      const newState = parentState.map(form =>
        form.localParentFormId === localParentFormId
          ? { ...form, isSuccessSubmit: isSuccess }
          : form,
      );
      setParentState(newState);

      if (parentState.length < MAX_PARENTS_COUNT) {
        addForm();
      }
    };

    const setIsMainParent = (isMain: boolean, localParentId: number, parentingId?: string) => {
      if (parentingId) {
        updateParenting({ parentingId, payload: { isMain } });
      }

      setParentState(
        parentState.map(form =>
          form.localParentFormId === localParentId
            ? {
                ...form,
                isMain,
              }
            : { ...form, isMain: false },
        ),
      );
    };

    return (
      <div>
        {parentState.length ? (
          <h2 className={styles.parentTitle}>Родители ученика*</h2>
        ) : (
          <h2 className={styles.parentTitle}>Родитель не добавлен</h2>
        )}
        <div className={style.wrapper}>
          <div className={style.forms}>
            {parentState.map(({ localParentFormId, isMain, parent, isSuccessSubmit }) => (
              <StudentParentsForm
                key={localParentFormId}
                localParentFormID={localParentFormId}
                isMainParent={isMain}
                setIsMainParent={setIsMainParent}
                studentId={studentId}
                franchiseId={franchiseId}
                setSuccessForm={setSuccessForm}
                parent={parent}
                isSuccessSubmit={isSuccessSubmit}
                isViewMode={isViewMode}
              />
            ))}
          </div>
          {parentState.length < MAX_PARENTS_COUNT && visibility && (
            <ButtonAddParent
              onClick={addForm}
              disabled={parentState.length === MAX_PARENTS_COUNT}
            />
          )}
        </div>
      </div>
    );
  },
);
