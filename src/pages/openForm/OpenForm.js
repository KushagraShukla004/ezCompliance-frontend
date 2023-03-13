import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { SpinnerImg } from '../../components/loader/Loader';
import {
  selectIsLoggedIn,
  selectUser,
} from '../../redux/features/auth/authSlice';
import {
  getFormById,
  submitResponse,
} from '../../redux/features/form/formSlice';
// import Header from '../FormBuilder/Header';
//MUI
import {
  Button,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  // Tab,
  // Tabs,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
// import { TabPanel } from '@mui/lab';
import { MdExpandMore } from 'react-icons/md';
// import ResponseTab from '../Response/ResponseTab';

const OpenForm = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const { formId } = useParams();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { form, isLoading, isError, message } = useSelector(
    (state) => state.form
  );
  const user = useSelector(selectUser);
  const [userId, setUserId] = useState('');
  const [responseData, setResponseData] = useState([]);
  const [createdByData, setCreatedByData] = useState([]);
  // console.log('createdByData: ', createdByData);
  // console.log('responseData(global useState): ', responseData);
  // const [value, setValue] = React.useState(0);

  const [questions, setQuestions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  }, [isSubmitted, navigate]);

  // useEffect(() => {
  //   setCreatedByData({
  //     _id: userId,
  //     name: user?.name,
  //     email: user?.email,
  //     role: user?.role,
  //   });
  // }, [userId, user?._id, user?.name, user?.email, user?.role]);
  // console.log('createdByData: ', createdByData);

  useEffect(() => {
    setQuestions(form?.questions);
    setUserId(user?._id);
    setCreatedByData(form?.createdBy);
  }, [form, user]);

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getFormById(formId));
    }

    if (isError) {
      console.log(message);
    }

    //eslint-disable-next-line
  }, [isLoggedIn, isError, message, dispatch]);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  const handleOptionChange = (event, i) => {
    const questionId = questions[i]._id;
    const questionText = questions?.find(
      (question) => question._id === questionId
    )?.questionText;
    const optionText = questions[i].options[event].optionText;
    const optionId = questions[i].options[event]._id;

    const updatedResponseData = responseData.filter(
      (response) => response.questionId !== questionId
    );
    updatedResponseData.push({
      questionId,
      questionText,
      optionId,
      optionText,
    });
    setResponseData(updatedResponseData);
    // console.log('responseData(inside handleOptionChange): ', responseData);
  };

  const onSubmitResponse = () => {
    dispatch(
      submitResponse({
        formId: formId,
        user: userId,
        response: responseData,
      })
    );
    setIsSubmitted(true);
  };

  return (
    <section>
      <br />

      {isLoading && <SpinnerImg />}
      {form && (
        <div
        // style={{
        //   border: '2px solid black',
        // }}
        >
          <Grid
            container
            direction='column'
            alignItems='center'
            // sx={{ border: '2px solid yellow' }}
          >
            <Grid item xs={12} sm={5} md={12} sx={{ width: '60vw' }}>
              <Grid
                style={{ borderTop: '8px solid #1D5DEC', borderRadius: 10 }}
              >
                <div>
                  <div>
                    <Paper elevation={2}>
                      <Grid
                        container
                        sx={{
                          flexDirection: 'column',
                          justifyContent: ' space-between',
                          // border: '2px solid red',
                        }}
                      >
                        <Grid
                          item
                          style={{
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            marginLeft: '15px',
                            paddingTop: '20px',
                            paddingBottom: '20px',
                            // border: '2px solid black',
                          }}
                        >
                          <Typography
                            variant='h4'
                            style={{
                              fontFamily: 'sans-serif Roboto',
                              marginBottom: '2rem',
                              fontSize: 25,
                              fontWeight: 600,
                            }}
                          >
                            {form.title}
                          </Typography>
                          <Typography
                            variant='h6'
                            style={{ fontSize: 15, fontWeight: 300 }}
                          >
                            {form.description}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  </div>
                </div>
              </Grid>
              {!isSubmitted ? (
                <div>
                  <Grid>
                    {questions?.map((ques, i) => (
                      <div key={i}>
                        <br />
                        <Paper>
                          <div>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                marginLeft: '6px',
                                paddingTop: '15px',
                                paddingBottom: '15px',
                              }}
                            >
                              <Typography variant='h4' sx={{ ml: '10px' }}>
                                {i + 1}. {ques.questionText}
                              </Typography>

                              <div>
                                <RadioGroup
                                  name='selectedOption'
                                  value={ques[i]?.optionId}
                                  onChange={(event) =>
                                    handleOptionChange(event.target.value, i)
                                  }
                                >
                                  {ques?.options.map((opt, j) => (
                                    <div key={j}>
                                      <div
                                        style={{
                                          display: 'flex',
                                          marginLeft: '7px',
                                        }}
                                      >
                                        <FormControlLabel
                                          value={j}
                                          name={opt.optionId}
                                          control={<Radio />}
                                          label={
                                            <Typography variant='h4'>
                                              {opt.optionText}
                                            </Typography>
                                          }
                                          sx={{ fontSize: '3rem' }}
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </RadioGroup>
                              </div>
                            </div>
                          </div>
                        </Paper>
                      </div>
                    ))}
                  </Grid>
                </div>
              ) : (
                <div className='container --mt --flex-center --dir-column'>
                  <h2>Form submitted! </h2>
                  <br />
                  <h4 style={{ color: '#574bc9' }}>
                    Thanks for submiting form.
                  </h4>
                </div>
              )}
              <Grid>
                <br />
                <div className='--flex-center'>
                  <Button
                    variant='contained'
                    color='primary'
                    sx={{ fontSize: 13 }}
                    onClick={onSubmitResponse}
                  >
                    Submit
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <div
            className='--flex-end'
            style={{
              marginTop: '15px',
              // paddingTop: '20px',
              // paddingBottom: '20px',
            }}
          >
            <Paper>
              <Accordion>
                <AccordionSummary
                  expandIcon={<MdExpandMore />}
                  style={{
                    fontFamily: 'Poppins',
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  Created By:
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    noWrap
                    style={{
                      fontFamily: 'sans-serif Roboto',
                      marginBottom: '2em',
                      fontSize: 15,
                    }}
                  >
                    Name: <b>{createdByData?.name}</b>
                  </Typography>
                  <Typography
                    style={{
                      fontFamily: 'sans-serif Roboto',
                      marginBottom: '2em',
                      fontSize: 15,
                    }}
                  >
                    Email: <b>{createdByData?.email}</b>
                  </Typography>
                  <Typography
                    noWrap
                    style={{
                      fontFamily: 'sans-serif Roboto',
                      marginBottom: '2rem',
                      fontSize: 15,
                    }}
                  >
                    Role: <b>{createdByData?.role}</b>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Paper>
          </div>
        </div>
      )}
    </section>
  );
};

export default OpenForm;
