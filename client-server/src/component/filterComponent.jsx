import React, { useState } from 'react';

const FilterComponent = ({ data, setFilteredData }) => {
  const [filterText, setFilterText] = useState('');

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterText(value);

    const filtered = data.filter((item) =>
      Object.values(item).some((val) => val.toString().toLowerCase().includes(value.toLowerCase()))
    );

    setFilteredData(filtered);
  };

  return (
    <div>
      <input
        type="text"
        value={filterText}
        onChange={handleFilterChange}
        placeholder="Filter data..."
      />
    </div>
  );
};

export default FilterComponent;
