import { Box, Grid, Paper, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import React from 'react';
import { tokens } from '../../theme';

const ResourcesForm = ({
  resource,
  Res_handleInputChange,
  Emp_handleInputChange,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Paper elevation={2} sx={{ backgroundColor: colors.primary[400] }}>
      <Box
        component='form'
        autoComplete='off'
        sx={{
          p: 1,
          flexGrow: 1,
        }}
        borderBottom={`9px solid ${colors.primary[500]}`}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant='h2' color='secondary'>
            <b>Employee Details</b>
          </Typography>
        </Box>
        <Grid container marginLeft={1} justifyContent='flex-start'>
          <Grid
            item
            xs={3}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              pt: 1,
              //   border: '2px solid green',
            }}
          >
            <Typography variant='h4' color={colors.grey[100]} sx={{ mr: 2 }}>
              ID :
            </Typography>
            <TextField
              variant='filled'
              name='empId'
              required
              placeholder='Emp ID'
              defaultValue={resource?.emp_Id}
              sx={{
                mb: 2,
                '& input': {
                  color: colors.grey[50],
                },
                width: '60%',
              }}
              size='small'
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
              display: 'flex',
              flexWrap: 'wrap',
              pt: 1,
            }}
          >
            <Typography
              variant='h4'
              color={colors.grey[100]}
              sx={{ ml: 1, mr: 2 }}
            >
              Name :
            </Typography>
            <TextField
              variant='filled'
              name='emp_name'
              required
              placeholder='Employee Name'
              sx={{
                mb: 2,
                width: '75%',
                '& input': {
                  color: colors.grey[50],
                },
              }}
              size='small'
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
              display: 'flex',
              flexWrap: 'wrap',
              pt: 1,
            }}
          >
            <Typography variant='h4' color={colors.grey[100]} sx={{ mr: 2 }}>
              Email :
            </Typography>
            <TextField
              variant='filled'
              name='email'
              required
              placeholder='Email'
              sx={{
                mb: 2,
                width: '75%',
                '& input': {
                  color: colors.grey[50],
                },
              }}
              size='small'
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
              display: 'flex',
              flexWrap: 'wrap',
              pt: 1,
            }}
          >
            <Typography variant='h4' color={colors.grey[100]} sx={{ mr: 2 }}>
              Designation:
            </Typography>
            <TextField
              variant='filled'
              name='designation'
              required
              placeholder='Designation'
              sx={{
                mb: 2,
                width: '70%',
                '& input': {
                  color: colors.grey[50],
                },
              }}
              size='small'
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
      <Box
        component='form'
        autoComplete='off'
        sx={{
          p: 1,
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant='h2' color='secondary'>
            <b>Add Resource</b>
          </Typography>
        </Box>
        <Grid container marginLeft={1} justifyContent='flex-start'>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              pt: 1,
            }}
          >
            <Typography variant='h4' color={colors.grey[100]} sx={{ mr: 2 }}>
              Name :
            </Typography>
            <TextField
              variant='filled'
              name='res_name'
              required
              placeholder='Resource Name'
              sx={{
                mb: 2,
                width: '80%',
                '& input': {
                  color: colors.grey[50],
                },
              }}
              size='small'
              inputProps={{
                style: {
                  height: 20,
                  fontSize: 20,
                  backgroundColor: colors.primary[500],
                },
              }}
              onChange={Res_handleInputChange}
            />
          </Grid>
          <Grid item xs={5} sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Typography variant='h4' color={colors.grey[100]} sx={{ mr: 2 }}>
              IP :
            </Typography>
            <TextField
              variant='filled'
              name='IP'
              required
              placeholder='IPv4 Address'
              sx={{
                mb: 2,
                '& input': {
                  color: colors.grey[50],
                },
                width: '70%',
              }}
              size='small'
              inputProps={{
                style: {
                  height: 20,
                  fontSize: 20,
                  backgroundColor: colors.primary[500],
                },
              }}
              onChange={Res_handleInputChange}
            />
          </Grid>
          <Grid item xs={7} sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Typography variant='h4' color={colors.grey[100]} sx={{ mr: 1 }}>
              Amount :
            </Typography>
            <TextField
              variant='filled'
              name='amount'
              placeholder='Amount'
              sx={{
                mb: 2,
                '& input': {
                  color: colors.grey[50],
                },
                width: '63%',
              }}
              size='small'
              inputProps={{
                style: {
                  height: 20,
                  fontSize: 20,
                  backgroundColor: colors.primary[500],
                },
              }}
              onChange={Res_handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Typography variant='h4' color={colors.grey[100]} sx={{ mr: 2 }}>
              Category :
            </Typography>
            <TextField
              variant='filled'
              name='category'
              required
              placeholder='Category'
              sx={{
                mb: 2,
                '& input': {
                  color: colors.grey[50],
                },
                width: '75%',
              }}
              size='small'
              inputProps={{
                style: {
                  height: 20,
                  fontSize: 20,
                  backgroundColor: colors.primary[500],
                },
              }}
              onChange={Res_handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Typography variant='h4' color={colors.grey[100]} sx={{ mr: 2 }}>
              Model No. :
            </Typography>
            <TextField
              variant='filled'
              name='modelnum'
              placeholder='Model Number'
              sx={{
                mb: 2,
                '& input': {
                  color: colors.grey[50],
                },
                width: '75%',
              }}
              size='small'
              inputProps={{
                style: {
                  height: 20,
                  fontSize: 20,
                  backgroundColor: colors.primary[500],
                },
              }}
              onChange={Res_handleInputChange}
            />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default ResourcesForm;
