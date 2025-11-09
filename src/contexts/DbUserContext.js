import { createContext, useContext } from 'react';

export const dbUsers = createContext();

export const useDbUsers = () => useContext(dbUsers);
