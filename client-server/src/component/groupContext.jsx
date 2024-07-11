import React, { createContext, useContext, useState } from 'react';

const GroupContext = createContext();

export const useGroupContext = () => useContext(GroupContext);

export const GroupProvider = ({ children }) => {
  const [group, setGroup] = useState([]);

  return (
    <GroupContext.Provider value={{ group, setGroup }}>
      {children}
    </GroupContext.Provider>
  );
};
