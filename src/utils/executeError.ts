import axios from 'axios';

export const executeError = async <T>(action: () => Promise<T>, store: any) => {
  try {
    store.isLoading = true;
    await action();
  } catch (error) {
    // TODO: что делать в случае ошибку, выводить в Snackbar?
    error = axios.isAxiosError(error)
      ? new Error(error.message)
      : typeof error === 'string'
      ? new Error(error)
      : error;
  } finally {
    store.isLoading = false;
  }
};
