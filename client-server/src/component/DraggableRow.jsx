import React, { memo, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemType = 'ROW';

const DraggableRow = memo(({ row, index, moveRow, showGroups, group, status, priorityOptions, quarterDates, finalDecision, requestorNames }) => {
  const ref = useRef(null);
  const [selectedStatus, setSelectedStatus] = useState(row.affectedGroupsList || '');
  const [selectedPriority, setSelectedPriority] = useState(row.critical || '');
  const [selectedPlanned, setSelectedPlanned] = useState(row.planned || '');
  const [selectedRequestorGroup, setSelectedRequestorGroup] = useState(row.requestorGroup || '');
  const [selectedFinalDecision, setSelectedFinalDecision] = useState(row.decision || '');
  const [selectedRequestorName, setSelectedRequestorName] = useState(row.productmanagername || '');

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item, monitor) => {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

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

  // Handlers and styles...

  return (
    <TableRow ref={ref} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'grab' }} key={index}>
      {/* Table cells... */}
    </TableRow>
  );
});

export default DraggableRow;
