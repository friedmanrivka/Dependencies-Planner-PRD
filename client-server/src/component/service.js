import axios from 'axios';

const API_URL = 'http://localhost:3001/api';
export const getAllGroup = async () => {
    try {
        const response = await axios.get(`${API_URL}/requestor-Group`);
        return response.data;
    } catch (error) {
        console.error('Error fetching lists:', error);
        throw error;
    }
};