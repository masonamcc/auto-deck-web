import React, {createContext} from 'react';

export const AuthUserContext = createContext();

export const useAuthUser = () => React.useContext(AuthUserContext);