import { useTheme } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser';
import { selectIsLoggedIn } from '../../../redux/features/auth/authSlice';
import {
  getAllUserResources,
  selectResources,
} from '../../../redux/features/resources/resourceSlice';
import { tokens } from '../../../theme';
//icons
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { shortenText } from '../../profile/Profile';
import { SpinnerImg } from '../../../components/loader/Loader';

const ResourcesTable = () => {
  useRedirectLoggedOutUser('/login');
  const dispatch = useDispatch(); //eslint-disable-next-line
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const resources = useSelector(selectResources);
  //eslint-disable-next-line
  const { isLoading, isError, message } = useSelector(
    (state) => state.resource
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getAllUserResources());
    }
    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, dispatch, isError, message]);

  return (
    <>
      {isLoading && <SpinnerImg />}
      {resources !== undefined ? (
        <>
          {resources?.length === 0 ? (
            <p style={{ color: `${colors.grey[100]}` }}>
              -- No Resource found, for any queries contact the authorities ...
            </p>
          ) : (
            <>
              {resources?.map((resource, index) => {
                const { employee, name, category, makeModel, createdAt } =
                  resource;
                return (
                  <Box
                    key={index}
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                    borderBottom={`4px solid ${colors.primary[500]}`}
                    p='20px'
                  >
                    <Box>
                      <Typography
                        variant='h4'
                        fontWeight='600'
                        color='secondary'
                      >
                        {name}
                      </Typography>
                      <Typography variant='h6' color={colors.grey[100]}>
                        Model No. - <b>{shortenText(makeModel, 13)}</b>
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant='h6' color={colors.grey[100]}>
                        <b>{category}</b>
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant='h6' color={colors.grey[100]}>
                        Owned By - <b>{employee?.name}</b>
                      </Typography>
                      <Typography variant='h6' color={colors.grey[100]}>
                        D: {createdAt.slice(0, 10)}
                      </Typography>
                      <Typography variant='h6' color={colors.grey[100]}>
                        T: {createdAt.slice(11, 19)}
                      </Typography>
                    </Box>
                    <Box
                      display='flex'
                      justifyContent='space-evenly'
                      alignItems='center'
                    >
                      <Tooltip
                        title={
                          <p style={{ color: 'white', fontSize: '1.5em' }}>
                            Open Form
                          </p>
                        }
                        aria-label='open-Form'
                      >
                        <IconButton aria-label='open-Form'>
                          {/* onClick={openForm} */}
                          <FileOpenIcon
                            sx={{ fontSize: '2em' }}
                            color='secondary'
                          />
                        </IconButton>
                      </Tooltip>

                      {/* <IconButton
                          onClick={openForm}
                        >
                          <FileOpenIcon size={15} color={colors.grey[100]} />
                        </IconButton> */}
                    </Box>
                  </Box>
                );
              })}
            </>
          )}
        </>
      ) : (
        <p style={{ color: `${colors.grey[100]}` }}>
          -- No Resource found, for any queries contact the authorities ...
        </p>
      )}
    </>
  );
};

export default ResourcesTable;
