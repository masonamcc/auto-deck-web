import { createContext, useContext } from 'react';

export const AwsUserContext = createContext();

export const useAwsUser = () => useContext(AwsUserContext);
