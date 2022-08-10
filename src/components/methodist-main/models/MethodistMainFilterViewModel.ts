import { Nullable } from 'app/types/Nullable';

export interface MethodistMainFilterViewModel {
  title: string;
  // TODO: удивительно конечно
  level: string;
  createdAt: Nullable<Date>;
}
