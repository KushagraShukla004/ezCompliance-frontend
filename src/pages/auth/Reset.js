import React, { useEffect, useState } from 'react';
import styles from './auth.module.scss';
import { MdPassword } from 'react-icons/md';
import Card from '../../components/card/Card';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { RESET, resetPassword } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';
import PasswordInput from '../../components/passwordInput/PasswordInput';

const initialState = {
  password: '',
  confirmPassword: '',
};

const Reset = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setformData] = useState(initialState);
  const { password, confirmPassword } = formData;
  const { resetToken } = useParams();

  const { isLoading, isError, isSuccess, isLoggedIn, message } = useSelector(
    (state) => state.auth
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const reset = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return toast.error('Passwords must be up to 6 characters');
    }
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    const userData = {
      password,
      confirmPassword,
    };

    await dispatch(resetPassword({ userData, resetToken }));
    await dispatch(RESET());
  };

  useEffect(() => {
    if (isSuccess && message.includes('Reset Successful')) {
      navigate('/login');
    }

    dispatch(RESET());
  }, [isError, isSuccess, message, isLoggedIn, dispatch, navigate]);

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <MdPassword size={35} color='#999' />
          </div>
          <h2>Reset Password</h2>

          <form onSubmit={reset}>
            <PasswordInput
              placeholder='New Password'
              required
              name='password'
              value={password}
              onChange={handleInputChange}
            />

            <PasswordInput
              placeholder='Confirm New Password'
              required
              name='confirmPassword'
              value={confirmPassword}
              onChange={handleInputChange}
            />

            <button type='submit' className='--btn --btn-primary --btn-block'>
              Reset Password
            </button>
            <div className={styles.links}>
              <p>
                <Link to='/'>- Home</Link>
              </p>
              <p>
                <Link to='/login'>- Login</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Reset;
