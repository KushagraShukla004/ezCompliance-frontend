import React, { useEffect } from 'react';
import './UserStats.scss';
import { BiUserCheck, BiUserMinus, BiUserX } from 'react-icons/bi';

import { useDispatch, useSelector } from 'react-redux';
import { FaUsers } from 'react-icons/fa';
import InfoBox from '../infoBox/InfoBox';
import {
  CALC_SUSPENDED_USER,
  CALC_VERIFIED_USER,
} from '../../redux/features/auth/authSlice';
import { tokens } from '../../theme';
import { useTheme } from '@mui/material';

// Icons
const icon1 = <FaUsers size={40} color='#fff' />;
const icon2 = <BiUserCheck size={40} color='#fff' />;
const icon3 = <BiUserMinus size={40} color='#fff' />;
const icon4 = <BiUserX size={40} color='#fff' />;

// Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const UserStats = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { users, verifiedUsers, suspendedUsers } = useSelector(
    (state) => state.auth
  );
  const unverifiedUsers = users.length - verifiedUsers;

  useEffect(() => {
    dispatch(CALC_VERIFIED_USER());
    dispatch(CALC_SUSPENDED_USER());
  }, [dispatch, users]);

  return (
    <div className='user-summary'>
      <h3 className='--mt' style={{ color: `${colors.grey[100]}` }}>
        User Stats
      </h3>
      <div className='info-summary'>
        <InfoBox
          icon={icon1}
          title={'Total Users'}
          count={users.length}
          bgColor='card1'
        />
        <InfoBox
          icon={icon2}
          title={'Verified Users'}
          count={verifiedUsers}
          bgColor='card2'
        />
        <InfoBox
          icon={icon3}
          title={'Unverified Users'}
          count={unverifiedUsers}
          bgColor='card3'
        />
        <InfoBox
          icon={icon4}
          title={'Suspended Users'}
          count={suspendedUsers}
          bgColor='card4'
        />
      </div>
    </div>
  );
};

export default UserStats;
