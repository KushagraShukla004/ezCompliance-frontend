// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import './ResponseTab.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  getResponse,
  // eslint-disable-next-line
  selectResponse,
} from '../../redux/features/form/formSlice';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { SpinnerImg } from '../../components/loader/Loader';
// eslint-disable-next-line
import { shortenText } from '../profile/Profile';
// import PieChart from './PieChart';
// eslint-disable-next-line
import { Box, Grid, Paper, Typography } from '@mui/material';
import ResponseList from './ResponseList';

const ResponseTab = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const { formId } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  // const response = useSelector(selectResponse);
  // console.log('selectReponse: ', response);

  const { response, isLoading, isError, message } = useSelector(
    (state) => state.form
  );

  useEffect(() => {
    if (isLoggedIn && formId !== undefined && formId !== '') {
      dispatch(getResponse(formId));
    }

    if (isError) {
      console.log(message);
    }
  }, [formId, isLoggedIn, isError, message, dispatch]);

  return (
    <section>
      <div className='container'>
        <Grid container direction='column' alignItems='center'>
          {/* style={{ border: '2px solid red' }} */}
          <div className='--flex-center --mb2'>
            <span>
              <h3> Responses </h3>
            </span>
          </div>
          {isLoading && <SpinnerImg />}
          <Grid item xs={12} sm={5} md={12} sx={{ width: '60vw' }}>
            <ResponseList responses={response} />
          </Grid>
        </Grid>
      </div>
    </section>
  );
};

export default ResponseTab;
