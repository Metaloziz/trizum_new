import { Dispatch, SetStateAction } from 'react';

import groupsService from 'app/services/groupsService';
import { Roles } from 'app/stores/appStore';
import usersStore from 'app/stores/usersStore';
import { RequestRegister } from 'app/types/AuthTypes';
import { ResponseOneUser } from 'app/types/UserTypes';
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
  groupId: string,
) => {
  const { createUser, updateUser } = usersStore;
  const { addUserGroup } = groupsService;

  let res;

  if (!groupId) {
    setError('group', {
      type: 'manual',
      message: 'выберите группу',
    });
    return;
  }

  if (user) {
    res = await updateUser(newUserData, user.id);
    if (typeof res === 'string') {
      setErrorFormMessage(res, setError);
      return;
    }
  } else {
    res = await createUser(newUserData);
    if (typeof res === 'string') {
      setErrorFormMessage(res, setError);
      return;
    }
  }

  if (res) {
    await addUserGroup({ userId: res.id, groupId });
  }

  if (role !== Roles.Student) {
    onCloseModal();
    reset();
    return;
  }
  if (typeof res === 'object' && 'id' in res) {
    setStudentId(res.id);
    setIsParentShown(true);
  }
};
