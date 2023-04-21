import React, { useState } from 'react';
import { User } from './types/User';
import { MyContext, MyContextInterface } from './context';

interface MyProviderProps {
  children: React.ReactNode;
}

export const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [userLogIn, setUserLogIn] = useState<User>();

  const myContext: MyContextInterface = {
    userLogIn,
    setUserLogIn,
  };

  return <MyContext.Provider value={myContext}>{children}</MyContext.Provider>;
};