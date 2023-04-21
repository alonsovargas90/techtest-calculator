import React from 'react';
import { User } from './types/User';

export interface MyContextInterface {
  userLogIn?: User;
  setUserLogIn?: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const MyContext = React.createContext<MyContextInterface>({
  userLogIn: undefined,
  setUserLogIn: () => {},
});
