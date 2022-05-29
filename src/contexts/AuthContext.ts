import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { UserAuth } from '@app/models/auth/UserAuth';
import { Client } from '@app/models/user/Client';
import { Manager } from '@app/models/user/Manager';
import {Roles} from "@app/stores/appStore";

export interface AuthContextValue {
  auth?: UserAuth;
  role?: Roles.Teacher | Roles.Student;
  // setAuth: Dispatch<SetStateAction<UserAuth | undefined>>;
  // setProfile: Dispatch<SetStateAction<Client | Manager | undefined>>;
  // setUserAuthenticated: Dispatch<{ auth: UserAuth; profile: Client | Manager }>;
  // clearUserAuthenticated: Dispatch<void>;
}

const AuthContext = createContext({} as AuthContextValue);
AuthContext.displayName = 'AuthContext';

export const useAuthContext = () => useContext(AuthContext);
export default AuthContext;
