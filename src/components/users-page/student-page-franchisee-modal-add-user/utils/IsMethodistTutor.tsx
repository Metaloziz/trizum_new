import { Roles } from 'app/stores/appStore';

export const isMethodistTutor = (role: Roles | undefined) => {
  const result = role === Roles.Methodist || role === Roles.Admin || role === Roles.Tutor;
  return !result;
};
