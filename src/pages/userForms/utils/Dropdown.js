import { MenuItem, Menu, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import React, { useState } from 'react';

//Icons
import { BsThreeDotsVertical } from 'react-icons/bs';

export const Dropdown = ({
  openForm,
  //   editForm,
  copyToClipboard,
  showResponse,
  deleteForm,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dropdownMenu = [
    {
      text: 'Open',
      onClick: openForm,
    },
    // {
    //   text: 'Edit',
    //   onClick: editForm,
    // },
    {
      text: 'Copy Link URL',
      onClick: copyToClipboard,
    },
    {
      text: 'Show Responses',
      onClick: showResponse,
    },
    {
      text: 'Delete',
      onClick: deleteForm,
    },
  ];
  return (
    <div>
      <IconButton
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <BsThreeDotsVertical size={20} color='primary' />
      </IconButton>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
          style: {
            width: '16em',
            borderRadius: 10,
          },
        }}
      >
        {dropdownMenu.map((el, index) => (
          <MenuItem key={index} value={el} onClick={() => el.onClick()}>
            <Typography variant='h5' className='--color-dark'>
              <b>{el.text}</b>
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
