export const setErrorFomMessage = (responseMessage: string, setError: any) => {
  if (responseMessage === 'email') {
    setError('email', {
      type: 'manual',
      message: 'такой email уже используется!',
    });
  }
  if (responseMessage === 'number') {
    setError('phone', {
      type: 'manual',
      message: 'такой телефон уже используется!',
    });
  }
};
