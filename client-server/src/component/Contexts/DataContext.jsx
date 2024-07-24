import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
const [group, setGroup] = useState([]);
const [productManager, setProductManager] = useState([]);

  return (
  //   <MyContext.Provider
  //   value={{ value: [value, setValue], value2: [value2, setValue2] }}
  // >
    <DataContext.Provider value={{ group: [group, setGroup],productManager: [productManager, setProductManager]}}>
      {children}
    </DataContext.Provider>
  );
};
