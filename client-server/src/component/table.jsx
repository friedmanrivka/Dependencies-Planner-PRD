import React, { useEffect, useState } from 'react';
import { useGroupContext } from './groupContext';
import { getGroup, getFinalDecision, getQuarterDates, getRequestorNames, getPriority, getDescriptions } from './services';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const initialRows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const ItemType = 'ROW';

const DraggableRow = ({ row, index, moveRow, showGroups, group }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveRow(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { type: ItemType, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <TableRow
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      key={row.name}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {row.name}
      </TableCell>
      {showGroups &&
        group.map((item) => (
          <TableCell align="right" key={item.id}>
            {item.name}
          </TableCell>
        ))}
      <TableCell align="right">{row.calories}</TableCell>
      <TableCell align="right">{row.fat}</TableCell>
      <TableCell align="right">{row.carbs}</TableCell>
      <TableCell align="right">{row.protein}</TableCell>
    </TableRow>
  );
};

const BasicTable = () => {
  const { group, setGroup } = useGroupContext();
  const [showGroups, setShowGroups] = useState(true);
  const [rows, setRows] = useState(initialRows);
  const [finalDecision, setFinalDecision] = useState([]);
  const [quarterDates, setQuarterDates] = useState([]);
  const [requestorNames, setRequestorNames] = useState([]);
  const [priority, setPriority] = useState([]);
  const [descriptions, setDescriptions] = useState([]);

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

        // const priorityData = await getPriority();
        // console.log(priorityData)

        // setPriority(priorityData);

        const descriptionsData = await getDescriptions();
        setDescriptions(descriptionsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [setGroup]);

  const toggleGroups = () => {
    setShowGroups(!showGroups);
  };

  const moveRow = (dragIndex, hoverIndex) => {
    const dragRow = rows[dragIndex];
    const newRows = [...rows];
    newRows.splice(dragIndex, 1);
    newRows.splice(hoverIndex, 0, dragRow);
    setRows(newRows);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
      {group.map((item) => (
    <li key={item.id}>{item.name}</li>
  ))}
        
        <Button variant="contained" onClick={toggleGroups}>
          {showGroups ? 'Hide Groups' : 'Show Groups'}
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                {showGroups &&
                  group.map((item) => (
                    <React.Fragment key={item.id}>
                      <TableCell align="right">{item.name}</TableCell>
                    </React.Fragment>
                  ))}
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)

                  
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <DraggableRow
                  key={row.name}
                  index={index}
                  row={row}
                  moveRow={moveRow}
                  showGroups={showGroups}
                  group={group}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ul>
          {group.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
          {finalDecision.map((item) => (
            <li key={item.id}>{item.decision}</li>
          ))}
          {quarterDates.map((item) => (
            <li key={item.id}>{item.date}</li>
          ))}
          {requestorNames.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
          {priority.map((item) => (
            <li key={item.id}>{item.level}</li>
          ))}
          {descriptions.map((item) => (
            <li key={item.id}>{item.description}</li>
          ))}
        </ul>
      </div>
    </DndProvider>
  );
};

export default BasicTable;

// import React, { useEffect, useState } from 'react';
// import { useGroupContext } from './groupContext';
// import { getGroup ,getFinalDecision,getQuarterDates,getRequestorNames,getPriority,getDescriptions} from './services';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';
// import { DndProvider, useDrag, useDrop } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const initialRows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// const ItemType = 'ROW';

// const DraggableRow = ({ row, index, moveRow, showGroups, group }) => {
//   const ref = React.useRef(null);

//   const [, drop] = useDrop({
//     accept: ItemType,
//     hover: (item, monitor) => {
//       if (!ref.current) {
//         return;
//       }
//       const dragIndex = item.index;
//       const hoverIndex = index;
//       if (dragIndex === hoverIndex) {
//         return;
//       }
//       const hoverBoundingRect = ref.current?.getBoundingClientRect();
//       const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
//       const clientOffset = monitor.getClientOffset();
//       const hoverClientY = clientOffset.y - hoverBoundingRect.top;
//       if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
//         return;
//       }
//       if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
//         return;
//       }
//       moveRow(dragIndex, hoverIndex);
//       item.index = hoverIndex;
//     },
//   });

//   const [{ isDragging }, drag] = useDrag({
//     type: ItemType,
//     item: { type: ItemType, index },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   drag(drop(ref));

//   return (
//     <TableRow
//       ref={ref}
//       style={{ opacity: isDragging ? 0.5 : 1 }}
//       key={row.name}
//       sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//     >
//       <TableCell component="th" scope="row">
//         {row.name}
//       </TableCell>
//       {showGroups &&
//         group.map((item) => (
//           <TableCell align="right" key={item.id}>
//             {/* Display data for group as needed */}
//           </TableCell>
//         ))}
//       <TableCell align="right">{row.calories}</TableCell>
//       <TableCell align="right">{row.fat}</TableCell>
//       <TableCell align="right">{row.carbs}</TableCell>
//       <TableCell align="right">{row.protein}</TableCell>
//     </TableRow>
//   );
// };

// const BasicTable = () => {
//   const { group, setGroup } = useGroupContext();
//   const [showGroups, setShowGroups] = useState(true);
//   const [rows, setRows] = useState(initialRows);

//   useEffect(() => {
//     const fetchGroup = async () => {
//       try {
//         const data = await getGroup();
//         setGroup(data);
//       } catch (error) {
//         console.error('Error fetching group:', error);
//       }
//     };  
//        const fetchFinalDecision = async () => {
//         try {
//           const data = await getFinalDecision();
//           setGroup(data);
//         } catch (error) {
//           console.error('Error fetching group:', error);
//         }
//       };
//             const fetchQuarterDates = async () => {
//           try {
//             const data = await getQuarterDates();
//             setGroup(data);
//           } catch (error) {
//             console.error('Error fetching group:', error);
//           }
//       };
//               const fetchRequestorNames = async () => {
//             try {
//               const data = await getRequestorNames();
//               setGroup(data);
//             } catch (error) {
//               console.error('Error fetching group:', error);
//             }
//           };
//                 const fetchPriority = async () => {
//               try {
//                 const data = await getPriority();
//                 setGroup(data);
//               } catch (error) {
//                 console.error('Error fetching group:', error);
//               }
//             };  
//              const fetchDescriptions = async () => {
//                 try {
//                   const data = await getDescriptions();
//                   setGroup(data);
//                 } catch (error) {
//                   console.error('Error fetching group:', error);
//                 }
//               };
//     if (group.length === 0) {
//       fetchGroup();
//     }
//   }, [group.length, setGroup]);

//   const toggleGroups = () => {
//     setShowGroups(!showGroups);
//   };

//   const moveRow = (dragIndex, hoverIndex) => {
//     const dragRow = rows[dragIndex];
//     const newRows = [...rows];
//     newRows.splice(dragIndex, 1);
//     newRows.splice(hoverIndex, 0, dragRow);
//     setRows(newRows);
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div>
//         <Button variant="contained" onClick={toggleGroups}>
//           {showGroups ? 'Hide Groups' : 'Show Groups'}
//         </Button>
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>Dessert (100g serving)</TableCell>
//                 {showGroups &&
//                   group.map((item) => (
//                     <React.Fragment key={item.id}>
//                       <TableCell align="right">{item.name}</TableCell>
//                     </React.Fragment>
//                   ))}
//                 <TableCell align="right">Calories</TableCell>
//                 <TableCell align="right">Fat&nbsp;(g)</TableCell>
//                 <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//                 <TableCell align="right">Protein&nbsp;(g)</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {rows.map((row, index) => (
//                 <DraggableRow
//                   key={row.name}
//                   index={index}
//                   row={row}
//                   moveRow={moveRow}
//                   showGroups={showGroups}
//                   group={group}
//                 />
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>

//       </div>
//     </DndProvider>
//   );
// };

// export default BasicTable;