import { ErrorMessageType } from 'utils/checkErrorMessage';

export const setErrorFormMessage = (responseMessage: ErrorMessageType, setError: any) => {
  switch (responseMessage) {
    case 'number':
    case 'phone':
      setError('phone', {
        type: 'manual',
        message: 'такой телефон уже используется!',
      });
      break;

    case 'email':
      setError('email', {
        type: 'manual',
        message: 'такой email уже используется!',
      });
      break;
    default:
  }
};
