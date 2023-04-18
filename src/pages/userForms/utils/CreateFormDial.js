import React, { useState } from 'react';
import { Box, SpeedDial, SpeedDialIcon } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const CreateFormDial = (props) => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel='Create Form'
        sx={{
          position: 'absolute',
          bottom: 20,
          right: 57,
          alignItems: 'center',
          '& .MuiSpeedDialIcon-icon': {
            display: 'flex',
            alignContent: 'center',
            fontSize: 35,
            marginTop: -0.8,
            color: 'white',
          },
          '& .MuiSpeedDialIcon-openIcon': {
            fontSize: 31,
            marginTop: -0.5,
            marginLeft: -2,
          },
        }}
        icon={<SpeedDialIcon openIcon={<EditIcon sx={{ color: 'white' }} />} />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        onClick={props.onClick}
        FabProps={{
          sx: {
            bgcolor: '#007bff',
            '&:hover': {
              bgcolor: '#005cbf',
            },
          },
        }}
      ></SpeedDial>
    </Box>
  );
};

export default CreateFormDial;
