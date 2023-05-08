import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import styles from './auth.module.scss';
import Card from '../../components/card/Card';
import PasswordInput from '../../components/passwordInput/PasswordInput';
import { ImUserPlus } from 'react-icons/im';
import { GiCrossMark } from 'react-icons/gi';
import { TiTick } from 'react-icons/ti';
import { Link, useNavigate } from 'react-router-dom';
import {
  validateEmail,
  validatePhone,
} from '../../redux/features/auth/authService';
import { useDispatch, useSelector } from 'react-redux';
import {
  register,
  RESET,
  sendVerificationEmail,
} from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';

const initialState = {
  emp_Id: '',
  name: '',
  designation: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);
  // console.log('formData: ', formData);
  //Destructuring variable from formData which is ultimately pointing to initialState values
  const { emp_Id, name, designation, email, phone, password, confirmPassword } =
    formData;
  // console.log('formData: ', formData);

  const { isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  //Validations
  const [uCase, setUCase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setSChar] = useState(false);
  const [passLength, setPassLength] = useState(false);
  // const phoneRegex =
  //   '(+91)?(-)?s*?(91)?s*?([6-9]{1}d{2})-?s*?(d{3})-?s*?(d{4})';

  const crossIcon = <GiCrossMark color='red' size={15} />;
  const checkIcon = <TiTick color='green' size={15} />;
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

    if (!emp_Id || !name || !designation || !email || !phone || !password) {
      return toast.error('All fields are required');
    }
    if (password.length < 6) {
      return toast.error('Passwords must be up to 6 characters');
    }
    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email');
    }
    if (!validatePhone(phone)) {
      return toast.error('Please enter a valid Phone Number');
    }
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }
    const userData = {
      emp_Id,
      name,
      designation,
      email,
      phone,
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

  // useEffect(() => {
  //   if (phone.match(phoneRegex)) {
  //     return toast.success('Phone Number is Valid');
  //   } else {
  //     return toast.error('Please use Valid Phone Number');
  //   }
  // }, [phone]);

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
            <div className='--flex-between'>
              <input
                type='text'
                placeholder='Emp Id'
                required
                name='emp_Id'
                value={emp_Id}
                onChange={handleInputChange}
                style={{ marginRight: '10px', width: '35%' }}
              />
              <input
                type='text'
                placeholder='Name'
                required
                name='name'
                value={name}
                onChange={handleInputChange}
              />
            </div>
            <input
              type='text'
              placeholder='Designation'
              required
              name='designation'
              value={designation}
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
            <input
              type='tel'
              placeholder='Phone No.'
              required
              name='phone'
              value={phone}
              onChange={handleInputChange}
            />
            {/* <input
              type='text'
              placeholder='Address'
              required
              name='Address'
              value={email}
              onChange={handleInputChange}
            /> */}
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
            {/* Password Strength Indicator */}
            <Card cardClass={styles.group}>
              {/* List  */}
              <ul className='form-list'>
                <li>
                  <span className={styles.indicator}>
                    {switchIcon(uCase)}
                    &nbsp; <p>Lowercase & Uppercase</p>
                  </span>
                </li>
                <li>
                  <span className={styles.indicator}>
                    {switchIcon(num)}
                    &nbsp; <p>Number (0-9)</p>
                  </span>
                </li>
                <li>
                  <span className={styles.indicator}>
                    {switchIcon(sChar)}
                    &nbsp; <p>Special Character (!@#$%^&*)</p>
                  </span>
                </li>
                <li>
                  <span className={styles.indicator}>
                    {switchIcon(passLength)}
                    &nbsp; <p>At least 6 Character</p>
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
