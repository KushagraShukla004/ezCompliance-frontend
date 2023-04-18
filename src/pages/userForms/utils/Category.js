import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { IconButton } from '@mui/material';
import { IoIosAdd } from 'react-icons/io';
// import Button from '@mui/material/Button';

export default function Category() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <div>
      {/* <Button onClick={handleToggle}>Show backdrop</Button> */}
      <IconButton
        color='primary'
        aria-label='add form'
        component='label'
        onClick={handleToggle}
      >
        <IoIosAdd />
      </IconButton>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  );
}
