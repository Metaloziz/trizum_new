import usersService from 'app/services/usersService';
import usersStore from 'app/stores/usersStore';
import { RequestRegister } from 'app/types/AuthTypes';
import { ParentT, RequestParenting, ResponseParenting } from 'app/types/UserTypes';
import { setErrorFormMessage } from 'utils/setErrorFormMessage';

export const action = async (
  setIsDisable: (value: boolean) => void,
  parent: undefined | ParentT,
  newParent: RequestRegister,
  setError: any,
  studentId: string,
  isMain: boolean,
  setIsSubmitSuccessful: (
    isSuccess: boolean,
    id: number,
    parentingData?: ResponseParenting,
  ) => void,
  localIdParentForm: number,
) => {
  const { createUser, createParenting } = usersStore;
  const { updateUser } = usersService;

  try {
    setIsDisable(true);

    let response;

    if (parent) {
      response = await updateUser(newParent, parent.id);
      if (typeof response === 'string') {
        setErrorFormMessage(response, setError);
        setIsDisable(false);
        return;
      }
    }
    response = await createUser(newParent);
    if (typeof response === 'string') {
      setErrorFormMessage(response, setError);
      setIsDisable(false);
      return;
    }

    if (typeof response === 'object') {
      const newParenting: RequestParenting = {
        parentId: response.id,
        childId: studentId,
        isMain,
      };
      const res = await createParenting(newParenting);

      setIsSubmitSuccessful(true, localIdParentForm, res);
    }
  } catch (e) {
    setIsDisable(false);
    console.warn(e);
  }
};
