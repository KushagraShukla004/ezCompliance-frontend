import { Typography, useTheme } from '@mui/material';
import React from 'react';
import { tokens } from '../theme';

const ErrorPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <div>
      <Typography variant='h2' color={colors.grey[100]}>
        Oops! Sorry you are not Authorized to Access this page. Login or SignUp
        First!
      </Typography>
    </div>
  );
};

export default ErrorPage;
