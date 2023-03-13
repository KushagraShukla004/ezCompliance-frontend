import React from 'react';
import { NavLink } from 'react-router-dom';
import { AdminAuditorForms, AdminLink } from '../protect/hiddenLink';

const PageMenu = () => {
  return (
    <div>
      <nav className='--btn-primary3 --p --mb'>
        <ul className='home-links'>
          <li>
            <NavLink to='/profile'>Profile</NavLink>
          </li>
          <li>
            <NavLink to='/change-password'>Change Password</NavLink>
          </li>
          <AdminLink>
            <li>
              <NavLink to='/users'>Users</NavLink>
            </li>
          </AdminLink>
          <AdminAuditorForms>
            <li>
              <NavLink to='/allForms'>All Forms</NavLink>
            </li>
          </AdminAuditorForms>
        </ul>
      </nav>
    </div>
  );
};

export default PageMenu;
