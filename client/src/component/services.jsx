import axios from 'axios';
const API_URL = 'http://localhost:3001/api';
export const deleteRequest = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/product-manager/${id}`);
        return response.status === 200;
    } catch (error) {
        console.error('Error deleting request:', error);
        throw error;
    }
};
export const checkEmailExists = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/check-email`, { email });
        return response.data;
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
export const getProductEmail = async () => {
    try {
        const response = await axios.get(`${API_URL}/requestor-email`);
        return response.data;
    } catch (error) {
        console.error('Error fetching ProductEmail:', error);
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
export const getAllGroups = async () => {
    try {
        const response = await axios.get(`${API_URL}/group`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all groups:', error);
        throw error;
    }
};
export const getAllProductsManager = async () => {
    try {
        const response = await axios.get(`${API_URL}/product-managers`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all product-managers:', error);
        throw error;
    }
};
export const updateFinalDecision = async (requestId, finalDecision, jiraLinkOrComment) => {
    try {
      const response = await axios.put(`${API_URL}/updateFinalDecision/${requestId}`, { finalDecision, jiraLinkOrComment });
      return response.data;
    } catch (error) {
      console.error('Error updating final decision:', error);
      throw error;
    }
  };

export const updatePriority = async (requestId, priorityName) => {
    try {
        const response = await axios.put(`${API_URL}/update-priority`, {requestId,  priorityName });
        return response.data;
    } catch (error) {
        console.error('Error updating priority:', error);
        throw error;
    }
};

export const updateRequestor = async (requestId, productManagerName) => {
    try {
        const response = await axios.put(`${API_URL}/update-product-manager`, {requestId,  productManagerName });
        return response.data;
    } catch (error) {
        console.error('Error updating priority:', error);
        throw error;
    }
};
export const updateRequestorGroup = async (requestId, groupName) => {
    try {
        const response = await axios.put(`${API_URL}/update-requestor-group`, {requestId,  groupName });
        return response.data;
    } catch (error) {
        console.error('Error updating priority:', error);
        throw error;
    }
};
export const deleteProductManager = async (email) => {
    try {
        const response = await axios.put(`${API_URL}/delete-product-manager${email}`);
        return response.data;
    } catch (error) {
        console.error(' delete Product Manager:', error);
        throw error;
    }
};

export const addProductManager = async (email, productManagerName) => {
    console.log('try')
    try {
       const response = await axios.post(`${API_URL}/addProductManager`, { email, productManagerName });
       return response.data;
    } catch (error) {
      console.error('Error adding product manager:', error);
      throw error;
    }
  };
  export const addGroup = async (groupName) => {
    console.log('Trying to add group');
    try {
     const response = await axios.post(`${API_URL}/add-group`, { groupName });
      return response.data;
    } catch (error) {
      console.error('Error adding group:', error);
      throw error;
    }
  };
export const addNewRequest = async (newRequest) => {
    try {
        console.log('Adding new request')
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
export const exportTable= async () => {
    try{
     const response = await axios.get(`${API_URL}/export/csv`);
     return response.data;
    } catch (error){
        console.error('Error export the table:', error);
        throw error;
    }
};



export const deleteGroup = async (groupId) => {
  
    try {
        const response = await axios.delete(`${API_URL}/delete-group/${groupId}`);
        return response.data;
    } catch (error) {
        console.error('Error delete group:', error);
    }
};
export const updateIdRow = async (id1,id2) => {
    try{
     const response = await axios.put(`http://localhost:3001/api/update-swapIdDrag/${id1}/${id2}`);
     return response.data;
    } catch (error){
        console.error('Error update request:', error);

        throw error;
    }
};
export const updateProductManagerName= async (email,productManagerName) => {
    try{
     const response = await axios.put(`http://localhost:3001/api/update-product-manager-name/${email}`,productManagerName);
     return response.data;
    } catch (error){
        console.error('Error update request:', error);

        throw error;
    }
};