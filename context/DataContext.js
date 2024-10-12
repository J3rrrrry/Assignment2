import React, { createContext, useState } from 'react';

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    activities: [
      { id: '1', name: 'Yoga', date: 'Mon Sep 16 2024', duration: '60 min' },
      { id: '2', name: 'Weights', date: 'Mon Jul 15 2024', duration: '120 min' },
    ],
    diet: [
      { id: '1', name: 'Breakfast', date: 'Tue Sep 17 2024', calories: 500 },
      { id: '2', name: 'Lunch', date: 'Wed Sep 25 2024', calories: 900 },
    ],
  });

  return (
    <DataContext.Provider value={{ data }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;

