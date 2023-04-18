import { useTheme } from '@mui/material';
import React from 'react';
import { tokens } from '../../theme';

const Footer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <hr />
      <div className='--flex-center --py2'>
        <p style={{ color: `${colors.grey[100]}` }}>
          All Rights Reserved. &copy; 2023
        </p>
      </div>
    </>
  );
};

export default Footer;
