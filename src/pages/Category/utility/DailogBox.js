import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { MdEdit } from 'react-icons/md';
import { useTheme } from '@mui/system';
import { tokens } from '../../../theme';
import EditCategory from '../EditCategory';
import { Typography } from '@mui/material';

const EditDailog = ({ id, category }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant='outlined' onClick={handleClickOpen}>
        <MdEdit size={20} color={`${colors.secondary[400]}`} />
      </Button>
      <Dialog
        fullWidth
        maxWidth='sm'
        open={open}
        onClose={handleClose}
        sx={{ color: `${colors.primary[400]}` }}
      >
        <DialogContent>
          <EditCategory id={id} category={category} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <Typography variant='h6' color={colors.grey[100]}>
              Cancel
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditDailog;
