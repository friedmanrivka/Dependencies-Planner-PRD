import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getGroup,
  getFinalDecision,
  getQuarterDates,
  getRequestorNames,
  getPriority,
  getDescriptions,
  getProductEmail,
  // checkEmailExists,
  // deleteRequest,
  // addNewRequest,
  getAllProductsManager,
  getAllStatus,
  getAllGroups,
  currentQ
} from '../services';

const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [group, setGroup] = useState([]);
  const [productManager, setProductManager] = useState([]);
  const [finalDecision, setFinalDecision] = useState([]);
  const [quarterDates, setQuarterDates] = useState([]);
  const [requestorNames, setRequestorNames] = useState([]);
  const [priorityOptions, setPriorityOptions] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [productEmail, setProductEmail] = useState([]);
  const [status, setStatus] = useState([]);
  const [productManagers, setProductManagers] = useState([]);
  const [groups, setGroups] = useState([]);

  const refreshRows = async () => {

    const descriptionsData = await getDescriptions();
    setDescriptions(descriptionsData);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {

        refreshRows();

        const groupData = await getGroup();
        setGroup(groupData);

        const finalDecisionData = await getFinalDecision();
        setFinalDecision(finalDecisionData);

        
        const requestorNamesData = await getRequestorNames();
        setRequestorNames(requestorNamesData);

        const priorityData = await getPriority();
        setPriorityOptions(priorityData);


        const productEmailData = await getProductEmail();
        setProductEmail(productEmailData);

        const allStatusData = await getAllStatus();
        setStatus(allStatusData);

        const productManagersData = await getAllProductsManager();
        setProductManagers(productManagersData);

        const groupsData = await getAllGroups();
        setGroups(groupsData);

       const quarterDatesData = await getQuarterDates();
        setQuarterDates(quarterDatesData);


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{
      group: [group, setGroup],
      productManager: [productManager, setProductManager],
      finalDecision: [finalDecision, setFinalDecision],
      quarterDates: [quarterDates, setQuarterDates],
      requestorNames: [requestorNames, setRequestorNames],
      priorityOptions: [priorityOptions, setPriorityOptions],
      descriptions: [descriptions, setDescriptions],
      productEmail: [productEmail, setProductEmail],
      status: [status, setStatus],
      productManagers: [productManagers, setProductManagers],
      groups: [groups, setGroups],
      refreshRows
    }}>
      {children}
    </DataContext.Provider>
  );
};
