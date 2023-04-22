import React, { createContext, useState } from 'react';
import { UserProfile } from '../types/UserProfile';

interface UserContextType {
  userProfile: UserProfile;
  setUserProfile: (userName: UserProfile) => void;
}

const defaultUserContext: UserContextType = {
  userProfile: {} as UserProfile,
  setUserProfile: () => {},
};

interface UserProviderProps {
    children: React.ReactNode;
  }
  

export const UserContext = createContext<UserContextType>(defaultUserContext);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>({} as UserProfile);

  const userContext: UserContextType = {
    userProfile,
    setUserProfile,
  };

  return <UserContext.Provider value={userContext}>{children}</UserContext.Provider>;
};