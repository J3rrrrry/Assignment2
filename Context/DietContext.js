import React, { createContext, useState } from 'react';

export const DietContext = createContext();

export const DietProvider = ({ children }) => {
  const [dietData, setDietData] = useState([]);

  return (
    <DietContext.Provider value={{ dietData, setDietData }}>
      {children}
    </DietContext.Provider>
  );
};

