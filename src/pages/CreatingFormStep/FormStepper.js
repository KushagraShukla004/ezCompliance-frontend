import {
  Box,
  Button,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
// import { useContext } from 'react';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { tokens } from '../../theme';
import EmployeeDetails from './EmployeeDetails';
import FormCategory from './FormCategory';
// import { MultiStepContext } from './StepContext';

const steps = ['Auditor Details', 'Chooose a Category'];

const FormStepper = () => {
  useRedirectLoggedOutUser('/login');
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [activeStep, setActiveStep] = useState(0);
  // const [skipped, setSkipped] = React.useState(new Set());

  // const isStepOptional = (step) => {
  //   return step === 1;
  // };

  // const isStepSkipped = (step) => {
  //   return skipped.has(step);
  // };

  const stepStyle = {
    padding: 2,
    '& .Mui-active': {
      fontSize: '1.5rem',
      '&.MuiStepIcon-root': {
        color: 'secondary.main',
        fontSize: '3rem',
        '& .MuiStepIcon-text': {
          fontSize: '30%',
          fontWeight: 600,
          fill: `${colors.primary[500]}`,
        },
      },
      '& .MuiStepConnector-line': {
        border: '2px solid',
        borderRadius: '2px',
        borderColor: 'secondary.main',
      },
    },
    '& .Mui-completed': {
      fontSize: '1.5rem',
      '&.MuiStepIcon-root': {
        color: 'secondary.main',
        fontSize: '3rem',
      },
      '& .MuiStepConnector-line': {
        border: '2px solid',
        borderRadius: '2px',
        borderColor: 'secondary.main',
      },
    },
    '& .Mui-disabled': {
      fontSize: '1.5rem',
      '& .MuiStepIcon-root': {
        fontSize: '3rem',
        '& .MuiStepIcon-text': {
          fontSize: '30%',
          fontWeight: 600,
          fill: `${colors.primary[500]}`,
        },
      },
      '& .MuiStepConnector-line': {
        border: '2px solid',
        borderRadius: '2px',
        borderColor: `${colors.grey[700]}`,
      },
    },
  };

  const showStep = (step) => {
    switch (step) {
      case 0:
        return <EmployeeDetails />;
      case 1:
        return <FormCategory />;
      default:
        return <h1>404 Error: Page Not Found</h1>;
    }
  };

  // const handleNext = () => {
  //   setActiveStep(activeStep + 1);
  // };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  // const handleReset = () => {
  //   setActiveStep(0);
  // };
  return (
    // Paper elevation={2} sx={{ backgroundColor: colors.primary[400] }}
    <Paper elevation={2} sx={{ backgroundColor: colors.primary[400] }}>
      <Box sx={{ mt: 2, width: '100%' }}>
        {/* <Typography variant='h4' sx={{ color: colors.grey[100] }}>
            Stepper
          </Typography> */}
        <Stepper activeStep={activeStep} sx={stepStyle} alternativeLabel>
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel
                sx={{
                  '.MuiStepLabel-root': {
                    fontSize: '40px',
                  },
                }}
              >
                {step}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        {showStep(activeStep)}
        <Box display='flex' justifyContent='center' alignItems='center'>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            <Typography variant='h6' color='neutral'>
              Back
            </Typography>
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default FormStepper;
