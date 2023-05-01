import React /*{ useState }*/ from 'react';
import {
  Box,
  Button,
  IconButton,
  InputBase,
  Typography,
  useTheme,
} from '@mui/material';
import { tokens } from '../../theme';
import './Dashboard.scss';
//eslint-disable-next-line
import UserResponses from '../userResponses/UserResponses';
import DownloadIcon from '@mui/icons-material/Download';
// import Search from '../../components/search/Search';
import { BiSearch } from 'react-icons/bi';
import RecentFormsTable from './stats/RecentFormsTable';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/auth/authSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import ResourcesTable from './stats/ResourcesTable';
import RowStats from './stats/RowStats';

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const user = useSelector(selectUser);
  useRedirectLoggedOutUser('/login');

  const createResponse = () => {
    navigate('/creatingForm');
  };
  const createForm = () => {
    navigate('/forms');
  };

  return (
    <section>
      {/* HEADER */}
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <h2 style={{ color: `${colors.grey[100]}` }}>Dashboard</h2>
        {user?.role === 'auditor' ? (
          <Box>
            <Button
              onClick={createResponse}
              variant='contained'
              sx={{
                backgroundColor: `${colors.secondary[700]}`,
                fontSize: 13,
                color: 'white',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  backgroundColor: `${colors.secondary[900]}`,
                },
                padding: '10px 20px',
              }}
            >
              Create an Audit
            </Button>
          </Box>
        ) : (
          <Box>
            <Button
              onClick={createForm}
              variant='contained'
              sx={{
                backgroundColor: `${colors.secondary[700]}`,
                fontSize: 13,
                color: 'white',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  backgroundColor: `${colors.secondary[900]}`,
                },
                padding: '10px 20px',
              }}
            >
              Create a Form
            </Button>
          </Box>
        )}
      </Box>
      {/*Grids */}
      <Box
        display='grid'
        gridTemplateColumns='repeat(12, 1fr)'
        gridAutoRows='100px'
        gap='20px'
        wrap='wrap'
        marginTop={3}
        // sx={{ border: 2 }}
      >
        {/* Row 1*/}
        <Box
          gridColumn='span 3'
          backgroundColor={colors.primary[400]}
          display='flex'
          alignItems='center'
          justifyContent='center'
          boxShadow={5}
          border={2}
        >
          <RowStats role={user?.role} />
        </Box>
        <Box
          gridColumn='span 3'
          backgroundColor={colors.primary[400]}
          display='flex'
          alignItems='center'
          justifyContent='center'
          boxShadow={5}
        >
          <h2 style={{ color: `${colors.grey[100]}` }}>Row 2</h2>
        </Box>
        <Box
          gridColumn='span 3'
          backgroundColor={colors.primary[400]}
          display='flex'
          alignItems='center'
          justifyContent='center'
          boxShadow={5}
        >
          <h2 style={{ color: `${colors.grey[100]}` }}>Row 3</h2>
        </Box>
        <Box
          gridColumn='span 3'
          backgroundColor={colors.primary[400]}
          display='flex'
          alignItems='center'
          justifyContent='center'
          boxShadow={5}
        >
          <h2 style={{ color: `${colors.grey[100]}` }}>Row 4</h2>
        </Box>
        {/* ROW 2 */}
        <Box
          gridColumn='span 7'
          gridRow='span 4'
          backgroundColor={colors.primary[400]}
          boxShadow={5}
          overflow='auto'
        >
          <Box
            mt='15px'
            p='0 0 10px 30px'
            display='flex '
            justifyContent='space-between'
            alignItems='center'
            borderBottom={`8px solid ${colors.primary[500]}`}
          >
            <Box>
              <Typography
                variant='h5'
                fontWeight='600'
                color={colors.grey[100]}
              >
                Resources
              </Typography>
              <Typography variant='h3' fontWeight='bold' color='secondary'>
                Total
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadIcon color='secondary' sx={{ fontSize: '2.3em' }} />
              </IconButton>
            </Box>
          </Box>
          <Box>
            <ResourcesTable />
          </Box>
        </Box>
        {/* Row 3*/}
        <Box
          gridColumn='span 5'
          gridRow='span 4'
          backgroundColor={colors.primary[400]}
          boxShadow={5}
          // border={2}
          overflow='auto'
        >
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            borderBottom={`9px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p='15px'
          >
            {user?.role === 'admin' ? (
              <Box component={NavLink} to='/forms'>
                <Typography
                  variant='h5'
                  fontWeight='600'
                  color={colors.grey[100]}
                >
                  Recent Forms Created
                </Typography>
              </Box>
            ) : (
              <Box component={NavLink} to='/responses'>
                <Typography
                  variant='h5'
                  fontWeight='600'
                  color={colors.grey[100]}
                >
                  Recent Forms Filled
                </Typography>
              </Box>
            )}
            {/* <Box component={NavLink} to='/responses'>
              <Typography
                noWrap
                variant='h6'
                fontWeight='600'
                color={colors.grey[100]}
              >
                All
              </Typography>
            </Box> */}
            {/* SEARCH BAR */}
            <Box
              display='flex'
              backgroundColor={colors.grey[400]}
              borderRadius='3px'
            >
              <InputBase
                sx={{ ml: 2, flex: 1, fontSize: '2em' }}
                placeholder='Search'
              />
              <IconButton type='button' sx={{ p: 1 }}>
                <BiSearch size={18} />
              </IconButton>
            </Box>
          </Box>
          <Box>
            <RecentFormsTable isRole={user?.role} />
          </Box>
        </Box>
      </Box>
    </section>
  );
};

export default Dashboard;
