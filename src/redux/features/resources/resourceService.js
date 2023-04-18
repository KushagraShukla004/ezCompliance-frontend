import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/resources/`;

//create Resource
const createResource = async (ResourceData) => {
  const response = await axios.post(API_URL + 'addResource', ResourceData);
  return response.data;
};
// Get all the Resources
const getAllResources = async () => {
  const response = await axios.get(API_URL + 'allResources');
  return response.data;
};

// Get all Resource
const getAllUserResources = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get a Resource
const getResourceById = async (res_Id) => {
  const response = await axios.get(API_URL + 'Resource/' + res_Id);
  return response.data;
};

const resourceService = {
  createResource,
  getAllResources,
  getAllUserResources,
  getResourceById,
};

export default resourceService;
