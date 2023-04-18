import { Box, IconButton, Tooltip, Typography, useTheme } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getAllFormsofUser,
  getAllResponseForms,
} from '../../../redux/features/form/formSlice';
import { tokens } from '../../../theme';
//icons
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { SpinnerImg } from '../../../components/loader/Loader';

const RecentFormsTable = ({ isRole }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //eslint-disable-next-line
  const { forms, responses, isError, message, isLoading } = useSelector(
    (state) => state.form
  );

  useEffect(() => {
    if (isRole === 'auditor') {
      dispatch(getAllResponseForms());
    }
    if (isRole === 'admin') {
      dispatch(getAllFormsofUser());
    }
    if (isError) {
      console.log(message);
    }
  }, [dispatch, isError, message, isRole]);

  const FormTable = useCallback(() => {
    // console.log(`isRole :`, isRole);
    // console.log('responses: ', responses);
    switch (isRole) {
      case 'auditor':
        return (
          <>
            {responses?.length === 0 ? (
              <p style={{ color: `${colors.grey[100]}` }}>
                -- No Response found, please add a Response...
              </p>
            ) : (
              <>
                {responses?.map((response, index) => {
                  const { formId, resForm, createdAt } = response;
                  // console.log(`response :`, response);

                  const openForm = () => {
                    navigate(`/forms/form/${formId}`);
                  };
                  // const showResponse = () => {
                  //   navigate(`/getResponse/${formId}`);
                  // };

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
                          {resForm?.category}
                        </Typography>
                        <Typography variant='h6' color={colors.grey[100]}>
                          Created By - <b>{resForm?.createdBy.name}</b>
                        </Typography>
                      </Box>
                      <Box>
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
                          <IconButton aria-label='open-Form' onClick={openForm}>
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
        );
      case 'admin':
        return (
          <>
            {forms?.length === 0 ? (
              <p style={{ color: `${colors.grey[100]}` }}>
                -- No Response found, please add a Response...
              </p>
            ) : (
              <>
                {forms?.map((form, index) => {
                  const { _id, category, createdBy, createdAt } = form;
                  // console.log(`form :`, form);

                  const showResponse = () => {
                    navigate(`/getResponse/${_id}`);
                  };
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
                          {category}
                        </Typography>
                        <Typography variant='h6' color={colors.grey[100]}>
                          Created By - <b>{createdBy?.name}</b>
                        </Typography>
                      </Box>
                      <Box>
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
                          <IconButton
                            aria-label='open-Form'
                            onClick={showResponse}
                          >
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
        );
      default:
        return (
          <>
            <p style={{ color: `${colors.grey[100]}` }}>Not Authorized</p>
          </>
        );
    }
    //eslint-disable-next-line
  }, [isRole, responses, colors]);

  return (
    <>
      {isLoading && <SpinnerImg />}
      {FormTable()}
    </>
  );
};

export default RecentFormsTable;
