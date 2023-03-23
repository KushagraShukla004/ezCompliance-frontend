import { useEffect } from 'react';
import FormBuilder from './pages/FormBuilder';
import 'react-nestable/dist/styles/index.css';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoginWithCode from './pages/auth/LoginWithCode';
import Forgot from './pages/auth/Forgot';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Reset from './pages/auth/Reset';
import ChangePassword from './pages/changePassword/ChangePassword';
import Home from './pages/Home/Home';
import Profile from './pages/profile/Profile';
import UserList from './pages/userList/UserList';
import OpenForm from './pages/openForm/OpenForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLoginStatus,
  getUser,
  selectIsLoggedIn,
  selectUser,
} from './redux/features/auth/authSlice';
import UserForms from './pages/userForms';
import ResponseTab from './pages/Response/ResponseTab';
import AllForms from './pages/allForms/AllForms';
import Dashboard from './pages/Dashboard/Dashboard';

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getLoginStatus());
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn, user]);

  return (
    <>
      <BrowserRouter>
        <ToastContainer style={{ width: '45rem', fontSize: '1.5rem' }} />
        <Routes>
          <Route
            path='/'
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path='/dashboard'
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot' element={<Forgot />} />
          <Route path='/resetPassword/:resetToken' element={<Reset />} />
          <Route path='/loginWithCode/:email' element={<LoginWithCode />} />

          <Route
            path='/profile'
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />
          <Route
            path='/change-password'
            element={
              <Layout>
                <ChangePassword />
              </Layout>
            }
          />
          <Route
            path='/users'
            element={
              <Layout>
                <UserList />
              </Layout>
            }
          />
          <Route
            path='/createForm'
            element={
              <Layout>
                <FormBuilder />
              </Layout>
            }
          />
          <Route
            path='/forms'
            element={
              <Layout>
                <UserForms />
              </Layout>
            }
          />
          <Route
            path='/allForms'
            element={
              <Layout>
                <AllForms />
              </Layout>
            }
          />
          <Route
            path='/forms/form/:formId'
            element={
              <Layout>
                <OpenForm />
              </Layout>
            }
          />
          <Route
            path='/responses/getResponse/:formId'
            element={
              <Layout>
                <ResponseTab />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
