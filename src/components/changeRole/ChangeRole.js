import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getUsers, upgradeUser } from '../../redux/features/auth/authSlice';

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

    await dispatch(upgradeUser(userData));
    await dispatch(getUsers());
  };

  return (
    <div className='sort'>
      <form
        className='--flex-start'
        onSubmit={(e) => changeUserRole(e, _id, userRole)}
      >
        <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
          <option value=''> -- select --</option>
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
