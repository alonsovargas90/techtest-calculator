import React, { createContext, useState } from "react";
interface LoaderContextType {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const defaultLoaderContext: LoaderContextType = {
  isLoading: false,
  setIsLoading: () => {},
};

interface LoaderProviderProps {
  children: React.ReactNode;
}

export const LoaderContext = createContext<LoaderContextType>(defaultLoaderContext);

export const LoaderProvider: React.FC<LoaderProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loaderContext: LoaderContextType = {
    isLoading,
    setIsLoading,
  };

  return (
    <LoaderContext.Provider value={loaderContext}>{children}</LoaderContext.Provider>
  );
};
