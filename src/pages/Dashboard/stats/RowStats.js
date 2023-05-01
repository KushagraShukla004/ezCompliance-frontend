import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import { tokens } from '../../../theme';
import { FaWpforms } from 'react-icons/fa';
import StatBox from './StatBox';

const RowStats = ({ role }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const stats = (role) => {
    switch (role) {
      case 'admin':
        return (
          <Box>
            <Typography variant='h5' fontWeight='600' color={colors.grey[100]}>
              Total Forms Made:
            </Typography>
            <Typography variant='h3' fontWeight='bold' color='secondary'>
              5
            </Typography>
          </Box>
        );
      case 'auditor':
        return (
          <Box
            width='100%'
            display='flex'
            flexWrap='wrap'
            alignItems='center'
            justifyContent='center'
            // border={2}
          >
            <StatBox
              title='30'
              subtitle='Audits Made'
              progress='0.75'
              icon={
                <FaWpforms
                  style={{ color: colors.greenAccent[600], fontSize: '26px' }}
                />
              }
            />
          </Box>
        );
      default:
        return (
          <Box>
            <Typography variant='h5' fontWeight='600' color={colors.grey[100]}>
              Total Audits:
            </Typography>
            <Typography variant='h3' fontWeight='bold' color='secondary'>
              3
            </Typography>
          </Box>
        );
    }
  };
  return <>{stats(role)}</>;
};

export default RowStats;
