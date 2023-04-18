import React, { useEffect, useState } from 'react';
import styles from './auth.module.scss';
import Card from '../../components/card/Card';
import PasswordInput from '../../components/passwordInput/PasswordInput';
import { RiLoginCircleFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { validateEmail } from '../../redux/features/auth/authService';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';
import {
  login,
  RESET,
  sendLoginCode,
} from '../../redux/features/auth/authSlice';

const initialState = {
  email: '',
  password: '',
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);
  //Destructuring variable from formData which is ultimately pointing to initialState values
  const { email, password } = formData;

  const { isLoading, isLoggedIn, isSuccess, isError, twoFactor } = useSelector(
    (state) => state.auth
  );

  const handleInputChange = (e) => {
    //this is to target data we putting in name and value attribute in input field
    const { name, value } = e.target;
    //...formData = Destructure any former properties it has than put new values in the given values like [name]: value
    setFormData({ ...formData, [name]: value });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error('All fields are required');
    }
    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email');
    }
    const userData = {
      email,
      password,
    };
    // console.log(userData);
    await dispatch(login(userData));
  };

  useEffect(() => {
    if (isLoggedIn && isSuccess) {
      navigate('/dashboard');
    }
    if (isError && twoFactor) {
      dispatch(sendLoginCode(email));
      navigate(`/loginWithCode/${email}`);
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, isError, twoFactor, email, navigate, dispatch]);

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <RiLoginCircleFill size={35} />
          </div>
          <h2>Login</h2>
          {/* <div className='--flex-center'>
            <button className='--btn --btn-google'>Login with Google</button>
          </div>
          <br /> */}
          <p className='--text-center --fw-bold'>or</p>

          <form onSubmit={loginUser}>
            <input
              type='email'
              placeholder='Email'
              required
              name='email'
              value={email}
              onChange={handleInputChange}
            />
            <PasswordInput
              placeholder='Password'
              name='password'
              value={password}
              onChange={handleInputChange}
            />
            <button type='submit' className='--btn --btn-primary --btn-block'>
              Login
            </button>
          </form>
          <Link to='/forgot'>Forgot Password</Link>
          <span className={styles.register}>
            <Link to='/'>Home</Link>
            <p> &nbsp; &nbsp; Don't have an account? &nbsp;</p>
            <Link to='/register'>Register</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Login;
