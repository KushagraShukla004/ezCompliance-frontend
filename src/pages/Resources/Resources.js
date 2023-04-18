import { Box, Button, Grid } from '@mui/material';
import { useTheme } from '@mui/system';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SpinnerImg } from '../../components/loader/Loader';
import { createResource } from '../../redux/features/resources/resourceSlice';
import { selectIsLoading } from '../../redux/features/resources/resourceSlice';
import { tokens } from '../../theme';
import ResourcesForm from './ResourcesForm';

const Res_initialState = {
  res_name: '',
  IP: '',
  amount: '',
  category: '',
  quantity: '',
  modelnum: '',
};

const Emp_initialState = {
  empId: '',
  emp_name: '',
  email: '',
  designation: '',
};

const Resources = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [resource, setResource] = useState(Res_initialState);
  const [employee, setEmployee] = useState(Emp_initialState);
  const { res_name, IP, amount, category, modelnum } = resource;
  const { empId, emp_name, email, designation } = employee;
  const isLoading = useSelector(selectIsLoading);

  const Res_handleInputChange = (e) => {
    const { name, value } = e.target;
    setResource({ ...resource, [name]: value });
  };
  const Emp_handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const saveForm = () => {
    dispatch(
      createResource({
        employee: {
          emp_Id: empId,
          name: emp_name,
          email: email,
          designation: designation,
        },
        name: res_name,
        IP: IP,
        category: category,
        amount: amount,
        makeModel: modelnum,
      })
    );

    navigate('/dashboard');
  };

  return (
    <>
      {isLoading && <SpinnerImg />}
      <section>
        <Grid
          container
          spacing={1}
          direction='row'
          justifyContent='center'
          sx={{ fontSize: '4em' }}
        >
          <Grid item lg={4.5} md={8} marginTop={3}>
            <ResourcesForm
              resource={resource}
              Res_handleInputChange={Res_handleInputChange}
              Emp_handleInputChange={Emp_handleInputChange}
            />
            <Grid>
              <Box
                mt={2}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Button
                  onClick={saveForm}
                  variant='contained'
                  sx={{
                    color: 'white',
                    backgroundColor: `${colors.blueAccent[500]}`,
                    fontSize: 15,
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      backgroundColor: `${colors.blueAccent[700]}`,
                    },
                    padding: '7.5px 17px',
                  }}
                >
                  Save
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </section>
    </>
  );
};

export default Resources;
