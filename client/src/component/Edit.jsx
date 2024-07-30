import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rowData, setRowData] = useState({});

  useEffect(() => {
    // Fetch existing data for the row
    axios.get(`/api/rows/${id}`)
      .then(response => setRowData(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRowData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`/api/rows/${id}`, rowData)
      .then(() => navigate('/'))
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(rowData).map((key) => (
        <div key={key}>
          <label>{key}</label>
          <input
            type="text"
            name={key}
            value={rowData[key] || ''}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit">שמור</button>
    </form>
  );
};
export default EditComponent;
