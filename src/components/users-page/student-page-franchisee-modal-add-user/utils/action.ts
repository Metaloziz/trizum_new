import { Dispatch, SetStateAction } from 'react';

import groupsService from 'app/services/groupsService';
import { Roles } from 'app/stores/appStore';
import usersStore from 'app/stores/usersStore';
import { RequestRegister } from 'app/types/AuthTypes';
import { ResponseOneUser } from 'app/types/UserTypes';
import { isMethodistTutor } from 'components/users-page/student-page-franchisee-modal-add-user/utils/IsMethodistTutor';
import { isStudentTeacherEducation } from 'components/users-page/student-page-franchisee-modal-add-user/utils/isStudentTeacherEducation';
import { setErrorFormMessage } from 'utils/setErrorFormMessage';

export const action = async (
  user: ResponseOneUser | undefined,
  newUserData: RequestRegister,
  setError: any,
  role: Roles,
  onCloseModal: () => void,
  reset: () => void,
  setStudentId: Dispatch<SetStateAction<string>>,
  setIsParentShown: Dispatch<SetStateAction<boolean>>,
  roleCode: string,
  franchise: string,
  tariff: string,
  groupId: string,
) => {
  const { createUser, updateUser } = usersStore;
  const { addUserGroup } = groupsService;

  if (!roleCode) {
    setError('role', {
      type: 'manual',
      message: 'выберите роль',
    });
    return;
  }

  if (isMethodistTutor(role)) {
    if (!franchise) {
      setError('franchise', {
        type: 'manual',
        message: 'выберите франшизу',
      });
      return;
    }
  }

  if (role === Roles.Student) {
    if (!tariff) {
      setError('tariff', {
        type: 'manual',
        message: 'выберите тариф',
      });
      return;
    }
  }

  if (isStudentTeacherEducation(role)) {
    if (!groupId) {
      setError('group', {
        type: 'manual',
        message: 'выберите группу',
      });
      return;
    }
  }

  let response;

  if (user) {
    response = await updateUser(newUserData, user.id);
    if (typeof response === 'string') {
      setErrorFormMessage(response, setError);
      return;
    }
  } else {
    response = await createUser(newUserData);
    if (typeof response === 'string') {
      setErrorFormMessage(response, setError);
      return;
    }
  }

  if (response) {
    if (isStudentTeacherEducation(role)) {
      await addUserGroup({ userId: response.id, groupId });
    }
  }

  if (role !== Roles.Student) {
    onCloseModal();
    reset();
    return;
  }
  if (typeof response === 'object' && 'id' in response) {
    setStudentId(response.id);
    setIsParentShown(true);
  }
};
