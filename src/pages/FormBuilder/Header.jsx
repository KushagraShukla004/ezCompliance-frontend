import { Fragment } from 'react';
import { Box, Paper, TextField, useTheme } from '@mui/material';
import { tokens } from '../../theme';
// import Card from '../../components/card/Card';

// prev props for Form description, setDescription;
const Header = ({ category, setCategory }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Fragment>
      <Box sx={{ mb: 2 }}>
        <Paper
          elevation={2}
          sx={{
            p: 2,
            borderTop: `8px solid ${colors.secondary[500]}`,
            borderRadius: 2,
            backgroundColor: colors.primary[400],
          }}
        >
          <TextField
            className='container'
            defaultValue={category}
            onBlur={(e) => setCategory(e.target.value)}
            variant='filled'
            placeholder='Category'
            name='category'
            size='small'
            sx={{
              mb: 3,
              '& input': {
                color: colors.grey[50],
              },
            }}
            // font size of input text
            inputProps={{
              style: {
                backgroundColor: colors.primary[500],
                fontSize: 25,
                fontWeight: 600,
              },
            }}
            fullWidth
          />
          {/* <TextField
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
          /> */}
        </Paper>
      </Box>
    </Fragment>
  );
};

export default Header;
