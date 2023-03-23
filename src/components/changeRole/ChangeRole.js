import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getUsers, upgradeUser } from '../../redux/features/auth/authSlice';
// import {
//   EMAIL_RESET,
//   sendAutomatedEmail,
// } from '../../redux/features/email/emailSlice';

const ChangeRole = ({ _id, email }) => {
  const [userRole, setUserRole] = useState('');
  const dispatch = useDispatch();

  // Upgrade User
  const changeUserRole = async (e, _id, userRole) => {
    e.preventDefault();

    if (!userRole) {
      return toast.error('please select a user role');
    }
    const userData = {
      role: userRole,
      id: _id,
    };

    // const emailData = {
    //   subject: 'Account Role Changed - ezCompliance',
    //   send_to: email,
    //   reply_to: 'noreply@ezcompliance.com',
    //   template: 'changeRole',
    //   url: '/login',
    // };

    await dispatch(upgradeUser(userData));
    // await dispatch(sendAutomatedEmail(emailData));
    await dispatch(getUsers());
    // dispatch(EMAIL_RESET());
  };

  return (
    <div className='sort'>
      <form
        className='--flex-start'
        onSubmit={(e) => changeUserRole(e, _id, userRole)}
      >
        <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
          <option value=''>-- select --</option>
          <option value='employee'>Employee</option>
          <option value='auditor'>Auditor</option>
          <option value='admin'>Admin</option>
          <option value='suspended'>Suspended</option>
        </select>
        <button className='--btn --btn-primary' type='submit'>
          <FaCheck size={15} />
        </button>
      </form>
    </div>
  );
};

export default ChangeRole;
