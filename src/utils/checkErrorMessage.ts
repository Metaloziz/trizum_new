export type ErrorMessageType = 'email' | 'number' | 'phone';

export const checkErrorMessage = (data: any): ErrorMessageType | undefined => {
  if (data?.error) {
    return data.error.split(' ')[0];
  }
  return undefined;
};
