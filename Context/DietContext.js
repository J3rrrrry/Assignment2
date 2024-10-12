import React, { createContext, useState } from 'react';

export const DietContext = createContext();

export const DietProvider = ({ children }) => {
  const [dietData, setDietData] = useState([
    { id: '1', name: 'Breakfast', date: 'Tue Sep 17 2024', value: '500' },
    { id: '2', name: 'Lunch', date: 'Wed Sep 25 2024', value: '900' },
  ]);

  return (
    <DietContext.Provider value={{ dietData, setDietData }}>
      {children}
    </DietContext.Provider>
  );
};
