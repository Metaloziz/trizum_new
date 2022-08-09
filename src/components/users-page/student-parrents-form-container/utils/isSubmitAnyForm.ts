import { ParentsFormStateType } from 'components/users-page/student-parrents-form-container/store/store';

export const isSubmitAnyForm = (form: ParentsFormStateType[]): boolean => {
  let result: boolean = false;

  form.forEach(element => {
    if (element.isSuccessSubmit) {
      result = true;
    }
  });

  return result;
};
