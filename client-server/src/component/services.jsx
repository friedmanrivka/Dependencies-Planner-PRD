import axios from 'axios';

const API_URL = 'http://localhost:3001/api';
export const getGroup = async () => {
    try {
        const response = await axios.get(`${API_URL}/requestor-Group`);
        return response.data;
    } catch (error) {
        console.error('Error fetching groups:', error);
        throw error;
    }
};
export const getDescriptions = async () => {
    try {
        const response = await axios.get(`http://localhost:3001/api/descriptions`);
        return response.data;
    } catch (error) {
        console.error('Error fetching groups:', error);
        throw error;
    }
};
export const getPriority = async () => {
    try {
        const response = await axios.get(`${API_URL}/priority`);
        return response.data;
    } catch (error) {
        console.error('Error fetching groups:', error);
        throw error;
    }
};
export const getRequestorNames = async () => {
    try {
        const response = await axios.get(`${API_URL}/requestor-names`);
        return response.data;
    } catch (error) {
        console.error('Error fetching groups:', error);
        throw error;
    }
};
export const getQuarterDates = async () => {
    try {
        const response = await axios.get(`${API_URL}/quarter-dates`);
        return response.data;
    } catch (error) {
        console.error('Error fetching groups:', error);
        throw error;
    }
};
export const getFinalDecision = async () => {
    try {
        const response = await axios.get(`${API_URL}/finalDecision`);
        return response.data;
    } catch (error) {
        console.error('Error fetching groups:', error);
        throw error;
    }
};
export const getAllStatus = async () => {
    try {
        const response = await axios.get(`${API_URL}/status`);
        return response.data;
    } catch (error) {
        console.error('Error fetching groups:', error);
        throw error;
    }
};

