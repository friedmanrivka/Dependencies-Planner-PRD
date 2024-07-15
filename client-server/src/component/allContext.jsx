// import React, { useEffect, useState } from 'react';
// import { useGroupContext } from './groupContext';
// import { getGroup, getFinalDecision, getQuarterDates, getRequestorNames, getPriority, getDescriptions } from './services';

// const Allcontext = () => {
//     const { group, setGroup } = useGroupContext();
//     const [finalDecision, setFinalDecision] = useGroupContext();;
//     const [quarterDates, setQuarterDates] = seGroupContext();;
//     const [requestorNames, setRequestorNames] = seGroupContext();;
//     const [priority, setPriority] = seGroupContext();;
//     const [descriptions, setDescriptions] = seGroupContext();;
  
//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const groupData = await getGroup();
//           setGroup(groupData);
         
//           const finalDecisionData = await getFinalDecision();        
//           setFinalDecision(finalDecisionData);
  
//           const quarterDatesData = await getQuarterDates();
//           setQuarterDates(quarterDatesData);
  
//           const requestorNamesData = await getRequestorNames();
//           setRequestorNames(requestorNamesData);
  
//           const priorityData = await getPriority();
//           console.log(priorityData)
  
//           setPriority(priorityData);
  
//           const descriptionsData = await getDescriptions();
//           setDescriptions(descriptionsData);
//         } catch (error) {
//           console.error('Error fetching data:', error);
//         }
//       };
  
//       fetchData();
//     }, [setGroup]);
//     return(<dive></dive>)
// }