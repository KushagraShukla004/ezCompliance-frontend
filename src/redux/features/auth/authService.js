import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/users/`;

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// Register User
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData);
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  return response.data;
};

// Logout user
const logout = async () => {
  const response = await axios.get(API_URL + 'logout');
  return response.data.message;
};

// Get Login Status
const getLoginStatus = async () => {
  const response = await axios.get(API_URL + 'loginStatus');
  return response.data;
};

// // Get User Profile
const getUser = async () => {
  const response = await axios.get(API_URL + 'getUser');
  return response.data;
};

// Forgot Password
const forgotPassword = async (userData) => {
  const response = await axios.post(API_URL + 'forgotPassword', userData);
  return response.data.message;
};

// Reset Password
const resetPassword = async (userData, resetToken) => {
  const response = await axios.patch(
    `${API_URL}resetPassword/${resetToken}`,
    userData
  );
  return response.data.message;
};

// Send Verification Email
const sendVerificationEmail = async () => {
  const response = await axios.post(API_URL + 'sendVerificationEmail');
  return response.data.message;
};

// Verify User
const verifyUser = async (verificationToken) => {
  const response = await axios.patch(
    `${API_URL}verifyUser/${verificationToken}`
  );
  return response.data.message;
};

// Update User
const updateUser = async (userData) => {
  const response = await axios.patch(API_URL + 'updateUser', userData);
  return response.data;
};

// Change Password
const changePassword = async (userData) => {
  const response = await axios.patch(API_URL + 'changePassword', userData);
  return response.data.message;
};

// Get Users
const getUsers = async () => {
  const response = await axios.get(API_URL + 'getUsers');
  return response.data;
};

// Delete User
const deleteUser = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data.message;
};

// upgrade user
const upgradeUser = async (userData) => {
  const response = await axios.post(API_URL + 'upgrade', userData);
  return response.data;
};

// sendAutomatedEmail
const sendAutomatedEmail = async (userData) => {
  const response = await axios.post(API_URL + 'sendAutomatedEmail', userData);
  return response.data.message;
};

// send Login Code
const sendLoginCode = async (email) => {
  const response = await axios.post(API_URL + `/sendLoginCode/${email}`);
  return response.data.message;
};

// Reset Password
const loginWithCode = async (code, email) => {
  const response = await axios.post(API_URL + `/loginWithCode/${email}`, code);
  return response.data;
};

// // loginWithGoogle
// const loginWithGoogle = async (userToken) => {
//   const response = await axios.post(API_URL + 'google/callback', userToken);
//   return response.data;
// };

const authService = {
  register,
  login,
  logout,
  getLoginStatus,
  getUser,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  updateUser,
  changePassword,
  getUsers,
  deleteUser,
  upgradeUser,
  verifyUser,
  sendAutomatedEmail,
  sendLoginCode,
  loginWithCode,
  //   loginWithGoogle,
};

export default authService;
