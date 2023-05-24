import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/forms/`;

//create Form
const createForm = async (formData) => {
  const response = await axios.post(API_URL + "createForm", formData);
  return response.data;
};
// Get all the Forms
const getAllForms = async () => {
  const response = await axios.get(API_URL + "allForms");
  return response.data;
};

// Get all Forms of User
const getAllFormsofUser = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get a Form
const getFormById = async (formId) => {
  const response = await axios.get(API_URL + "form/" + formId);
  return response.data;
};
// Edit Form
const editForm = async (formId, formData) => {
  console.log("editForm formData (in formService): ", formData);
  const response = await axios.patch(`${API_URL}editForm/${formId}`, formData);
  return response.data;
};

// Delete a Form
const deleteForm = async (formId) => {
  const response = await axios.delete(API_URL + "deleteForm/" + formId);
  return response.data;
};

const submitResponse = async (responseData) => {
  const response = await axios.post(API_URL + "addResponse", responseData);
  return response.data;
};

const getAllResponseForms = async () => {
  const response = await axios.get(API_URL + "Responses");
  return response.data;
};

const getResponse = async (formId) => {
  const response = await axios.get(API_URL + "getResponse/" + formId);
  return response.data;
};

const formService = {
  createForm,
  getAllForms,
  getAllFormsofUser,
  getFormById,
  editForm,
  deleteForm,
  submitResponse,
  getResponse,
  getAllResponseForms,
};

export default formService;
