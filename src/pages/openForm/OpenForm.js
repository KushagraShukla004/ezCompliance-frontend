import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SpinnerImg } from "../../components/loader/Loader";
import {
  selectIsLoggedIn,
  selectUser,
} from "../../redux/features/auth/authSlice";
import {
  getFormById,
  submitResponse,
} from "../../redux/features/form/formSlice";
import { selectEmpDetails } from "../../redux/features/form/EmployeeDetailsSlice";
//MUI
import {
  Button,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  Box,
} from "@mui/material";
import { MdExpandMore } from "react-icons/md";
import { tokens } from "../../theme";

const OpenForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formId } = useParams();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userRole = useSelector(selectUser);
  const EmpDetails = useSelector(selectEmpDetails);

  const { form, isLoading, isError, message } = useSelector(
    (state) => state.form
  );
  const user = useSelector(selectUser);
  const [userId, setUserId] = useState("");
  const [responseData, setResponseData] = useState([]);
  const [createdByData, setCreatedByData] = useState([]);
  const [employeeData, setEmployeeData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [isSubmitted, navigate]);

  useEffect(() => {
    setQuestions(form?.questions);
    setUserId(user?._id);
    setCreatedByData(form?.createdBy);
    setEmployeeData(EmpDetails);
  }, [form, user, EmpDetails]);

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getFormById(formId));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, formId, dispatch]);

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
  };

  const onSubmitResponse = () => {
    dispatch(
      submitResponse({
        formId: formId,
        user: userId,
        category: form?.category,
        employee: employeeData,
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
        <div>
          <Grid container direction="column" alignItems="center">
            <Grid item xs={12} sm={5} md={12} sx={{ width: "60vw" }}>
              <Grid
                style={{
                  borderTop: `8px solid ${colors.secondary[500]}`,
                  borderRadius: 10,
                }}
              >
                <div>
                  <div>
                    <Paper
                      elevation={5}
                      sx={{
                        backgroundColor: `${colors.primary[400]}`,
                      }}
                    >
                      <Grid
                        container
                        sx={{
                          flexDirection: "column",
                          justifyContent: " space-between",
                        }}
                      >
                        <Grid
                          item
                          style={{
                            flexDirection: "column",
                            alignItems: "flex-start",
                            marginLeft: "15px",
                            paddingTop: "20px",
                            paddingBottom: "20px",
                          }}
                        >
                          <Typography
                            variant="h4"
                            style={{
                              fontFamily: "sans-serif Roboto",
                              marginBottom: "2rem",
                              fontSize: 25,
                              fontWeight: 600,
                              color: `${colors.grey[100]}`,
                            }}
                          >
                            {form.category}
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
                        <Paper
                          elevation={5}
                          sx={{
                            backgroundColor: `${colors.primary[400]}`,
                          }}
                        >
                          <div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                marginLeft: "6px",
                                paddingTop: "15px",
                                paddingBottom: "15px",
                              }}
                            >
                              <Typography
                                color={colors.grey[100]}
                                variant="h4"
                                sx={{ ml: "10px" }}
                              >
                                {i + 1}. {ques.questionText}
                              </Typography>
                              <br />
                              <Grid container spacing={1}>
                                <Grid item ml={2} md={5}>
                                  <RadioGroup
                                    name="selectedOption"
                                    value={ques[i]?.optionId}
                                    onChange={(event) =>
                                      handleOptionChange(event.target.value, i)
                                    }
                                  >
                                    {ques?.options.map((opt, j) => (
                                      <div key={j}>
                                        <div
                                          style={{
                                            display: "flex",
                                            marginLeft: "7px",
                                          }}
                                        >
                                          <FormControlLabel
                                            value={j}
                                            name={opt.optionId}
                                            control={
                                              <Radio
                                                sx={{
                                                  color: `${colors.grey[100]}`,
                                                  "& .MuiSvgIcon-root": {
                                                    fontSize: 17,
                                                  },
                                                  "&.Mui-checked": {
                                                    color: `${colors.grey[100]}`,
                                                  },
                                                }}
                                              />
                                            }
                                            label={
                                              <Typography
                                                color={colors.grey[100]}
                                                variant="h4"
                                              >
                                                {opt.optionText}
                                              </Typography>
                                            }
                                            sx={{ fontSize: "3rem" }}
                                          />
                                        </div>
                                      </div>
                                    ))}
                                  </RadioGroup>
                                </Grid>
                                <Grid item ml={2} md={6}>
                                  <Box display="grid" gap={2}>
                                    <label htmlFor="remark">
                                      <Typography
                                        color={colors.grey[100]}
                                        variant="h5"
                                      >
                                        Remark :
                                      </Typography>
                                    </label>
                                    <textarea
                                      name="remark"
                                      id={i}
                                      rows="5"
                                      style={{
                                        color: `${colors.grey[100]}`,
                                        backgroundColor: `${colors.primary[500]}`,
                                        fontFamily: "sans-serif Roboto",
                                        fontSize: 15,
                                        fontWeight: 600,
                                        padding: "5px",
                                      }}
                                    />
                                  </Box>
                                </Grid>
                              </Grid>
                            </div>
                          </div>
                        </Paper>
                      </div>
                    ))}
                  </Grid>
                </div>
              ) : (
                <div className="container --mt --flex-center --dir-column">
                  <h2>Form submitted! </h2>
                  <br />
                  <h4 style={{ color: "#574bc9" }}>
                    Thanks for submiting form.
                  </h4>
                </div>
              )}
              <Grid>
                <br />
                {userRole?.role === "auditor" && (
                  <div className="--flex-center">
                    <Button
                      onClick={onSubmitResponse}
                      variant="contained"
                      sx={{
                        backgroundColor: `${colors.blueAccent[500]}`,
                        fontSize: 15,
                        transition: "all 0.3s",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          backgroundColor: `${colors.blueAccent[700]}`,
                        },
                        padding: "7px 17px",
                      }}
                    >
                      Submit
                    </Button>
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>
          <div
            className="--flex-between"
            style={{
              marginTop: "15px",
            }}
          >
            <Paper elevation={10}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<MdExpandMore />}
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: 15,
                    fontWeight: 600,
                    backgroundColor: `${colors.primary[400]}`,
                    borderRadius: "5px 5px 0 0",
                  }}
                >
                  Created By:
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    backgroundColor: `${colors.primary[400]}`,
                    borderRadius: "0 0 5px 5px",
                  }}
                >
                  <Typography
                    noWrap
                    marginBottom="2em"
                    fontSize={15}
                    color={colors.grey[100]}
                  >
                    Name: <b>{createdByData?.name}</b>
                  </Typography>
                  <Typography
                    noWrap
                    marginBottom="2em"
                    fontSize={15}
                    color={colors.grey[100]}
                  >
                    Email: <b>{createdByData?.email}</b>
                  </Typography>
                  <Typography
                    noWrap
                    marginBottom="2em"
                    fontSize={15}
                    color={colors.grey[100]}
                  >
                    Role: <b>{createdByData?.role}</b>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Paper>
            {userRole?.role === "auditor" &&
              Object.keys(employeeData).length !== 0 && (
                <>
                  <Paper elevation={10}>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<MdExpandMore />}
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: 15,
                          fontWeight: 600,
                          backgroundColor: `${colors.primary[400]}`,
                          borderRadius: "5px 5px 0 0",
                        }}
                      >
                        Created For:
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{
                          backgroundColor: `${colors.primary[400]}`,
                          borderRadius: "0 0 5px 5px",
                        }}
                      >
                        <Typography
                          noWrap
                          marginBottom="2em"
                          fontSize={15}
                          color={colors.grey[100]}
                        >
                          ID: <b>{employeeData?.empId}</b>
                        </Typography>
                        <Typography
                          noWrap
                          marginBottom="2em"
                          fontSize={15}
                          color={colors.grey[100]}
                        >
                          Name: <b>{employeeData?.name}</b>
                        </Typography>
                        <Typography
                          noWrap
                          marginBottom="2em"
                          fontSize={15}
                          color={colors.grey[100]}
                        >
                          Email: <b>{employeeData?.email}</b>
                        </Typography>
                        <Typography
                          noWrap
                          marginBottom="2em"
                          fontSize={15}
                          color={colors.grey[100]}
                        >
                          Role: <b>{employeeData?.designation}</b>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </Paper>
                </>
              )}
          </div>
        </div>
      )}
    </section>
  );
};

export default OpenForm;
