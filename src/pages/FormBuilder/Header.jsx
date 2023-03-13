import { Fragment } from 'react';
import { Box, Paper, TextField } from '@mui/material';
// import Card from '../../components/card/Card';

const Header = ({ title, description, setTitle, setDescription }) => {
  return (
    <Fragment>
      <Box sx={{ mb: 2 }}>
        <Paper
          elevation={3}
          sx={{ p: 2, borderTop: '8px solid #9C27B0', borderRadius: 2 }}
        >
          <TextField
            className='container'
            defaultValue={title}
            onBlur={(e) => setTitle(e.target.value)}
            variant='filled'
            placeholder='Form Title'
            name='title'
            size='small'
            sx={{ mb: 3 }}
            inputProps={{ style: { fontSize: 25, fontWeight: 600 } }} // font size of input text
            fullWidth
          />
          <TextField
            name='description'
            defaultValue={description}
            onBlur={(e) => setDescription(e.target.value)}
            variant='filled'
            placeholder='Form Description'
            fullWidth
            size='small'
            inputProps={{ style: { fontSize: 16 } }} // font size of input text
            sx={{ mb: 1 }}
            multiline
            rows={2}
          />
        </Paper>
      </Box>
    </Fragment>
  );
};

export default Header;
