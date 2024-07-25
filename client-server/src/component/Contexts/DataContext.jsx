import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getGroup,
  getFinalDecision,
  getQuarterDates,
  getRequestorNames,
  getPriority,
  getDescriptions,
  getProductEmail,
  checkEmailExists,
  deleteRequest,
  addNewRequest,
  getAllStatus
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
  const [checkEmailExists, setCheckEmailExists] = useState([]);
  const [addNewRequest, setAddNewRequest] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const groupData = await getGroup();
        setGroup(groupData);

        const finalDecisionData = await getFinalDecision();
        setFinalDecision(finalDecisionData);

        const quarterDatesData = await getQuarterDates();
        setQuarterDates(quarterDatesData);

        const requestorNamesData = await getRequestorNames();
        setRequestorNames(requestorNamesData);

        const priorityData = await getPriority();
        setPriorityOptions(priorityData);

        const descriptionsData = await getDescriptions();
        setDescriptions(descriptionsData);

        const productEmailData = await getProductEmail();
        setProductEmail(productEmailData);

        const allStatusData = await getAllStatus();
        setStatus(allStatusData);

        const checkEmailExistsData = await checkEmailExists();
        setCheckEmailExists(checkEmailExistsData);


        const addNewRequestData = await addNewRequest();
        setAddNewRequest(addNewRequestData);



 

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
      checkEmailExists: [checkEmailExists, setCheckEmailExists],
      addNewRequest: [addNewRequest, setAddNewRequest],
      status: [status, setStatus]
    }}>
      {children}
    </DataContext.Provider>
  );
};
