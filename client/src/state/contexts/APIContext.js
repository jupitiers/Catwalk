import React, {createContext, useContext, useState} from 'react';

export const APIContext = createContext({});

const APIProvider = ({children}) => {




  return (
    <APIContext.Provider
      value={{
        
      }}
    >
    {children}
    </APIContext.Provider>
  );
};

export default APIProvider;