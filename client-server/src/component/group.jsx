// import React from 'react';
// import { useGroupContext } from './groupContext';

// const Page1 = () => {
//   const { group } = useGroupContext();

//   return (
//     <div>
//       <h2>Page 1</h2>
//       <ul>
//         {group.map((item) => (
//           <li key={item.id}>{item.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Page1;


// import React, { useEffect, useState } from 'react';
// import { getGroup } from './services';
// const GroupTable = () => {
//   const [group, setGroup] = useState([]);
//   const fetchGroup = async () => {
//     try {
//       const data = await getGroup();
//       setGroup(data);
//     } catch (error) {
//       console.error('Error fetching group:', error);
//     }
//   };

//   useEffect(() => {
//     fetchGroup();
//   }, []);

//   return (
//     <div>
    
//       the table:  <br></br>
//                                     {group?.map((item) => (
//                                         <React.Fragment key={item.id}>   
//                                            <dive>Id: {item.id}</dive>  <br></br>
//                                          <dive>name: {item.name}</dive>  <br></br>
//                                          </React.Fragment>
//                                     ))}                   
//       </div>
//   );
// };

// export default GroupTable;
