import React, { createContext, useState } from 'react';

export const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [activityData, setActivityData] = useState([]);

  return (
    <ActivityContext.Provider value={{ activityData, setActivityData }}>
      {children}
    </ActivityContext.Provider>
  );
};
