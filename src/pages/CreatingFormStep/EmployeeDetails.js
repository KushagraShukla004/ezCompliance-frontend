import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { tokens } from "../../theme";

const Emp_initialState = {
  empId: "",
  emp_name: "",
  email: "",
  designation: "",
};

const EmployeeDetails = () => {
  //eslint-disable-next-line
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [employee, setEmployee] = useState(Emp_initialState);
  //eslint-disable-next-line
  const { empId, emp_name, email, designation } = employee;
  const Emp_handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const saveAuditorData = () => {};

  return (
    <section>
      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="center"
        sx={{ fontSize: "4em" }}
      >
        <Grid item lg={4.5} md={8} marginTop={3}>
          <Box
            component="form"
            autoComplete="off"
            sx={{
              p: 1,
              flexGrow: 1,
            }}
            //   borderBottom={`9px solid ${colors.primary[500]}`}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h2" color="secondary">
                <b>Employee Details</b>
              </Typography>
            </Box>
            <Grid container marginLeft={1} justifyContent="flex-start">
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  pt: 1,
                  //   border: '2px solid green',
                }}
              >
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  sx={{ mr: 2 }}
                >
                  ID :
                </Typography>
                <TextField
                  variant="filled"
                  name="empId"
                  required
                  placeholder="ID"
                  //   defaultValue={resource?.emp_Id}
                  sx={{
                    mb: 2,
                    "& input": {
                      color: colors.grey[50],
                    },
                    width: "55%",
                  }}
                  size="small"
                  inputProps={{
                    style: {
                      height: 20,
                      fontSize: 20,
                      backgroundColor: colors.primary[500],
                    },
                  }}
                  onChange={Emp_handleInputChange}
                />
              </Grid>
              <Grid
                item
                xs={8.5}
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  pt: 1,
                }}
              >
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  sx={{ ml: 1, mr: 2 }}
                >
                  Name :
                </Typography>
                <TextField
                  variant="filled"
                  name="emp_name"
                  required
                  placeholder="Name"
                  sx={{
                    mb: 2,
                    width: "65%",
                    "& input": {
                      color: colors.grey[50],
                    },
                  }}
                  size="small"
                  inputProps={{
                    style: {
                      height: 20,
                      fontSize: 20,
                      backgroundColor: colors.primary[500],
                    },
                  }}
                  onChange={Emp_handleInputChange}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  pt: 1,
                }}
              >
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  sx={{ mr: 2 }}
                >
                  Email :
                </Typography>
                <TextField
                  variant="filled"
                  name="email"
                  required
                  placeholder="Email"
                  sx={{
                    mb: 2,
                    width: "74%",
                    "& input": {
                      color: colors.grey[50],
                    },
                  }}
                  size="small"
                  inputProps={{
                    style: {
                      height: 20,
                      fontSize: 20,
                      backgroundColor: colors.primary[500],
                    },
                  }}
                  onChange={Emp_handleInputChange}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  pt: 1,
                }}
              >
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  sx={{ mr: 2 }}
                >
                  Designation:
                </Typography>
                <TextField
                  variant="filled"
                  name="designation"
                  required
                  placeholder="Designation"
                  sx={{
                    mb: 2,
                    width: "65%",
                    "& input": {
                      color: colors.grey[50],
                    },
                  }}
                  size="small"
                  inputProps={{
                    style: {
                      height: 20,
                      fontSize: 20,
                      backgroundColor: colors.primary[500],
                    },
                  }}
                  onChange={Emp_handleInputChange}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Box
        mt={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          onClick={saveAuditorData}
          variant="contained"
          sx={{
            color: "white",
            backgroundColor: `${colors.blueAccent[500]}`,
            fontSize: 15,
            transition: "all 0.3s",
            "&:hover": {
              transform: "translateY(-2px)",
              backgroundColor: `${colors.blueAccent[700]}`,
            },
            padding: "7.5px 17px",
          }}
        >
          Save
        </Button>
      </Box>
    </section>
  );
};

export default EmployeeDetails;
