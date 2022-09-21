import { CourseViewModel } from 'app/viewModels/CourseViewModel';
import { MethodistMainStore } from 'components/methodist-main/stores';

type InputNameType = keyof Pick<CourseViewModel, 'title' | 'level' | 'type' | 'status'>;

export const isError = (store: MethodistMainStore, inputName: InputNameType): boolean => {
  if (!!store.editingEntity[inputName]) {
    return (
      store.editingEntity[inputName] !== null &&
      !store.validateSchema.fields[inputName].isValidSync(store.editingEntity[inputName])
    );
  }

  return false;
};
