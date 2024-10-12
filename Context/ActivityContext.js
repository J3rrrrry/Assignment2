import React, { createContext, useState } from 'react';

export const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [activityData, setActivityData] = useState([
    { id: '1', name: 'Yoga', date: 'Mon Sep 16 2024', value: '60 min' },
    { id: '2', name: 'Weights', date: 'Mon Jul 15 2024', value: '120 min' },
  ]);

  return (
    <ActivityContext.Provider value={{ activityData, setActivityData }}>
      {children}
    </ActivityContext.Provider>
  );
};
