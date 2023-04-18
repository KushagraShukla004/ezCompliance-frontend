import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Header.scss';
import { HiShieldCheck } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { logout, RESET } from '../../redux/features/auth/authSlice';
// import { ShowOnLogin, ShowOnLogout } from '../protect/HiddenLink';
import { FaUserCircle } from 'react-icons/fa';
// import { MdOutlineDarkMode } from 'react-icons/md';
// import { LightModeIcon } from '@mui/icons-material/LightMode';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import {
  AuditorLink,
  AdminLink,
  // AdminAuditorForms,
  ShowOnLogin,
  ShowOnLogout,
} from '../protect/hiddenLink';
import { UserName } from '../../pages/profile/Profile';
import { IconButton, useTheme } from '@mui/material';
import { ColorModeContext } from '../../theme';
// import { UserName } from '../../pages/profile/Profile';
// import { googleLogout } from '@react-oauth/google';

const activeLink = ({ isActive }) => (isActive ? `${'active'}` : '');

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const colorMode = useContext(ColorModeContext);

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
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? (
              <DarkModeOutlinedIcon style={{ fontSize: '1.5em' }} />
            ) : (
              <LightModeOutlinedIcon
                // sx={{}}
                style={{ color: 'white', fontSize: '1.5em' }}
              />
            )}
          </IconButton>
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
              <NavLink to='/dashboard' className={activeLink}>
                Dashboard
              </NavLink>
            </li>
            {/* <li>
              <NavLink to='/profile'>Profile</NavLink>
            </li> */}
            <AdminLink>
              <li>
                <NavLink to='/forms' className={activeLink}>
                  Forms
                </NavLink>
              </li>
            </AdminLink>
            <AuditorLink>
              <li>
                <NavLink to='/Responses' className={activeLink}>
                  Responses
                </NavLink>
              </li>
            </AuditorLink>
            <li>
              <button onClick={logoutUser} className='--btn --btn-primary'>
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
