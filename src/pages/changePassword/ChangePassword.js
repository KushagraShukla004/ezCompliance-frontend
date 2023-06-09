import React, { useState } from 'react';
import Card from '../../components/card/Card';
import PageMenu from '../../components/pageMenu/PageMenu';
import PasswordInput from '../../components/passwordInput/PasswordInput';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ChangePassword.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  changePassword,
  logout,
  RESET,
} from '../../redux/features/auth/authSlice';
import { SpinnerImg } from '../../components/loader/Loader';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';
// import { sendAutomatedEmail } from '../../redux/features/email/emailSlice';

const initialState = {
  oldPassword: '',
  password: '',
  password2: '',
};

const ChangePassword = () => {
  useRedirectLoggedOutUser('/login');
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setformData] = useState(initialState);
  const { oldPassword, password, password2 } = formData;

  const { isLoading } = useSelector((state) => state.auth);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const updatePassword = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      return toast.error('New passwords do not match');
    }

    const userData = {
      oldPassword,
      password,
    };

    await dispatch(changePassword(userData));
    // await dispatch(sendAutomatedEmail(emailData));
    await dispatch(logout());
    dispatch(RESET());
    navigate('/login');
  };

  return (
    <div>
      <section>
        <div className='container'>
          <PageMenu />
          <h2
            className='--flex-center --mt2'
            style={{ color: `${colors.grey[100]}` }}
          >
            Change Password
          </h2>
          <div className='--flex-center --mt2 change-password'>
            <Card cardClass={'card'}>
              <form onSubmit={updatePassword}>
                <label>Current Password:</label>
                <PasswordInput
                  placeholder='Current Password'
                  name='oldPassword'
                  value={oldPassword}
                  onChange={handleInputChange}
                />
                <label>New Password:</label>
                <PasswordInput
                  placeholder='New Password'
                  name='password'
                  value={password}
                  onChange={handleInputChange}
                />
                <label>New Password:</label>
                <PasswordInput
                  placeholder='Confirm New Password'
                  name='password2'
                  value={password2}
                  onChange={handleInputChange}
                  onPaste={(e) => {
                    e.preventDefault();
                    toast.error('Cannot paste into input field.');
                    return false;
                  }}
                />
                {isLoading ? (
                  <SpinnerImg />
                ) : (
                  <button className='--btn --btn-block --btn-danger'>
                    Change Password
                  </button>
                )}
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChangePassword;
