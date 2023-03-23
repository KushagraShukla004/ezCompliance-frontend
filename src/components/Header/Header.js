import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Header.scss';
import { HiShieldCheck } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { logout, RESET } from '../../redux/features/auth/authSlice';
// import { ShowOnLogin, ShowOnLogout } from '../protect/HiddenLink';
import { FaUserCircle } from 'react-icons/fa';
import {
  // AuditorLink,
  // AdminLink,
  AdminAuditorForms,
  ShowOnLogin,
  ShowOnLogout,
} from '../protect/hiddenLink';
import { UserName } from '../../pages/profile/Profile';
// import { UserName } from '../../pages/profile/Profile';
// import { googleLogout } from '@react-oauth/google';

const activeLink = ({ isActive }) => (isActive ? `${'active'}` : '');

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goHome = () => {
    navigate('/');
  };
  const goProfile = () => {
    navigate('/profile');
  };

  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    // googleLogout();
    navigate('/login');
  };

  return (
    <header className='header'>
      <nav>
        <div className='logo' onClick={goHome}>
          <HiShieldCheck size={35} />
          <span>ezCompliance</span>
        </div>
        <ul className='home-links'>
          <ShowOnLogin>
            <li className='--flex-center' onClick={goProfile}>
              <FaUserCircle size={20} />
              &nbsp;
              <UserName />
            </li>
          </ShowOnLogin>
          <ShowOnLogout>
            <li>
              <button className='--btn --btn-primary2'>
                <Link to='/login'>Login</Link>
              </button>
            </li>
          </ShowOnLogout>

          <ShowOnLogin>
            <li>
              <NavLink to='/dashboard'>Dashboard</NavLink>
            </li>
            <li>
              <NavLink to='/profile' className={activeLink}>
                Profile
              </NavLink>
            </li>
            <AdminAuditorForms>
              <li>
                <NavLink to='/forms'>Forms</NavLink>
              </li>
            </AdminAuditorForms>
            <li>
              <button onClick={logoutUser} className='--btn --btn-secondary'>
                Logout
              </button>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
