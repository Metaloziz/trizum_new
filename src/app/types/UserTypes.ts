export type UserT = {
  id: string;
  firstName: string;
  middleName: null | string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  franchise: null | string;
  city: null | string;
  birthdate: {
    date: string;
    timezone_type: string;
    timezone: string;
  };
  sex: null | string;
  status: string;
  avatar: {
    id: string;
    path: string;
  };
  userGroups: string[];
  parentings: string;
  offsprings: string;
  tariff: string;
  playResults: string[];
  isSecondChild: boolean;
};
