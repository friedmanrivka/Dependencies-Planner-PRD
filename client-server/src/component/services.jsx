import axios from 'axios';

const API_URL = 'http://localhost:3001/api';
export const getGroup = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/api/requestor-names`);
        return response.data;
    } catch (error) {
        console.error('Error fetching groups:', error);
        throw error;
    }
};

