export type ErrorMessageType = 'email' | 'number';

export const checkErrorMessage = (data: any): ErrorMessageType | undefined => {
  if (data?.error) {
    return data.error.split(' ')[0];
  }
  return undefined;
};
