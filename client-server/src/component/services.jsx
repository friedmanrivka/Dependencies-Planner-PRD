import axios from 'axios';
const API_URL = 'http://localhost:3001/api';
export const checkEmailExists = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/check-email`, { email });
        return response.data.exists;
    } catch (error) {
        console.error('Error checking email:', error);
        throw error;
    }
};
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

        const response = await axios.get(`${API_URL}/requestor-Details`);

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
export const updateFinalDecision = async (id,finalDecision) => {
    try {
        const response = await axios.put(`${API_URL}/updateFinalDecision/${id}`,finalDecision);
        return response.data;
    } catch (error) {
        console.error('Error fetching groups:', error);
        throw error;
    }
};
export const addNewRequest = async (newRequest) => {
    try {
        const response = await axios.post(`${API_URL}/requestor-Details`, newRequest, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding request:', error);
        throw error;
    }
};

export const updateDescription = async (id,description) => {
    try{
     const response = await axios.put(`${API_URL}/update-description`, {id,description});
     return response.data;
    } catch (error){
        console.error('Error update request:', error);
        throw error;
    }
};

export const updateTitle = async (id,title) => {
    try{
     const response = await axios.put(`${API_URL}/update-title`,{id,title} );
     return response.data;
    } catch (error){
        console.error('Error update request:', error);
        throw error;
    }
};
export const updateJira= async (id,jira) => {
    try{
     const response = await axios.put(`${API_URL}/update-jira`,{id,jira} );
     return response.data;
    } catch (error){
        console.error('Error update jira in  request:', error);
        throw error;
    }
};
export const updateComment= async (id,comment) => {
    try{
     const response = await axios.put(`${API_URL}/update-comment`, {id,comment});
     return response.data;
    } catch (error){
        console.error('Error update jira in  request:', error);
        throw error;
    }
};
