import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { tokens } from "../../theme";
import { ADD_EMP_DETAILS } from "../../redux/features/form/EmployeeDetailsSlice";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import {
  validateEmail,
  validateID,
} from "../../redux/features/auth/authService";
import { toast } from "react-toastify";

const Emp_initialState = {
  empId: "",
  name: "",
  email: "",
  designation: "",
};

const EmployeeDetails = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [employee, setEmployee] = useState(Emp_initialState);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Emp_handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const saveAuditorData = async () => {
    if (
      !(
        employee?.empId &&
        employee?.name &&
        employee?.email &&
        employee?.designation
      )
    ) {
      return toast.error("All fields are required");
    }
    if (!validateEmail(employee?.email) || !validateID(employee?.empId)) {
      return toast.error("Please enter a valid email employee ID");
    }
    await dispatch(ADD_EMP_DETAILS(employee));
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        sx={{
          color: "white",
          backgroundColor: `${colors.blueAccent[500]}`,
          fontSize: 13,
          transition: "all 0.3s",
          "&:hover": {
            transform: "translateY(-2px)",
            backgroundColor: `${colors.blueAccent[700]}`,
          },
          padding: "7.5px 17px",
        }}
      >
        Add Employee Details
      </Button>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        sx={{ color: `${colors.primary[400]}` }}
      >
        <DialogContent>
          <Grid
            container
            spacing={1}
            direction="row"
            justifyContent="center"
            sx={{ fontSize: "4em" }}
          >
            <Grid item marginTop={3}>
              <Box
                component="form"
                autoComplete="off"
                sx={{
                  p: 1,
                  flexGrow: 1,
                }}
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
                      sx={{
                        mb: 2,
                        "& input": {
                          color: colors.grey[50],
                        },
                        width: "65%",
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
                      name="name"
                      required
                      placeholder="Name"
                      sx={{
                        mb: 2,
                        width: "75%",
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
                        width: "80%",
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
                        width: "68%",
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <Typography variant="h6" color={colors.grey[100]}>
              Cancel
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EmployeeDetails;
