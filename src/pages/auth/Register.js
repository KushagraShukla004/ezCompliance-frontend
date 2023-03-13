import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import styles from './auth.module.scss';
import Card from '../../components/card/Card';
import PasswordInput from '../../components/passwordInput/PasswordInput';
import { ImUserPlus } from 'react-icons/im';
import { GiCrossMark } from 'react-icons/gi';
import { TiTick } from 'react-icons/ti';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../redux/features/auth/authService';
import { useDispatch, useSelector } from 'react-redux';
import {
  register,
  RESET,
  sendVerificationEmail,
} from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);
  //Destructuring variable from formData which is ultimately pointing to initialState values
  const { name, email, password, confirmPassword } = formData;

  const { isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  //Validations
  const [uCase, setUCase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setSChar] = useState(false);
  const [passLength, setPassLength] = useState(false);

  const crossIcon = <GiCrossMark color='red' size={10} />;
  const checkIcon = <TiTick color='green' size={10} />;
  const switchIcon = (condition) => {
    if (condition) {
      return checkIcon;
    }
    return crossIcon;
  };

  const handleInputChange = (e) => {
    //this is to target data we putting in name and value attribute in input field
    const { name, value } = e.target;
    //...formData = Destructure any former properties it has than put new values in the given values like [name]: value
    setFormData({ ...formData, [name]: value });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.error('All fields are required');
    }
    if (password.length < 6) {
      return toast.error('Passwords must be up to 6 characters');
    }
    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email');
    }
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }
    const userData = {
      name,
      email,
      password,
    };
    // console.log(userData);
    await dispatch(register(userData));
    await dispatch(sendVerificationEmail());
  };

  //Navigate to profile after registration
  useEffect(() => {
    if (isLoggedIn && isSuccess) {
      navigate('/profile');
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, message, navigate, dispatch]);

  useEffect(() => {
    // Check Lower and Uppercase
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setUCase(true);
    } else {
      setUCase(false);
    }
    // Check For Numbers
    if (password.match(/([0-9])/)) {
      setNum(true);
    } else {
      setNum(false);
    }
    // Check For Special char
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setSChar(true);
    } else {
      setSChar(false);
    }
    // Check if password up to 6
    if (password.length > 5) {
      setPassLength(true);
    } else {
      setPassLength(false);
    }
  }, [password]);

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <ImUserPlus size={35} color='#999' />
          </div>
          <h2>Register</h2>
          <form onSubmit={registerUser}>
            <input
              type='text'
              placeholder='Name'
              required
              name='name'
              value={name}
              onChange={handleInputChange}
            />
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
            <PasswordInput
              placeholder='Confirm Password'
              name='confirmPassword'
              value={confirmPassword}
              onChange={handleInputChange}
              onPaste={(e) => {
                e.preventDefault();
                toast.error('Cannot paste into this input field.');
                return false;
              }}
            />
            {/* <input
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={handleInputChange}
            /> */}
            {/* Password Strength Indicator */}
            <Card cardClass={styles.group}>
              {/* List  */}
              <ul className='form-list'>
                <li>
                  <span className={styles.indicator}>
                    {switchIcon(uCase)}
                    &nbsp; Lowercase & Uppercase
                  </span>
                </li>
                <li>
                  <span className={styles.indicator}>
                    {switchIcon(num)}
                    &nbsp; Number (0-9)
                  </span>
                </li>
                <li>
                  <span className={styles.indicator}>
                    {switchIcon(sChar)}
                    &nbsp; Special Character (!@#$%^&*)
                  </span>
                </li>
                <li>
                  <span className={styles.indicator}>
                    {switchIcon(passLength)}
                    &nbsp; At least 6 Character
                  </span>
                </li>
              </ul>
            </Card>
            <button type='submit' className='--btn --btn-primary --btn-block'>
              Register
            </button>
          </form>
          <span className={styles.register}>
            <Link to='/'>Home</Link>
            <p> &nbsp;&nbsp; Already have an account? &nbsp;&nbsp;</p>
            <Link to='/login'>Login</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Register;
