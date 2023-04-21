import React, { createContext, useState } from 'react';

interface UserContextType {
  userProfile: string;
  setUserProfile: (userName: string) => void;
}

const defaultUserContext: UserContextType = {
  userProfile: '',
  setUserProfile: () => {},
};

interface UserProviderProps {
    children: React.ReactNode;
  }
  

export const UserContext = createContext<UserContextType>(defaultUserContext);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<string>('');

  const userContext: UserContextType = {
    userProfile,
    setUserProfile,
  };

  return <UserContext.Provider value={userContext}>{children}</UserContext.Provider>;
};