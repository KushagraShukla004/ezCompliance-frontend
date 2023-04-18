import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import { MdExpandMore } from 'react-icons/md';
//eslint-disable-next-line
import PieChart from './PieChart';
import { tokens } from '../../theme';

const ResponseList = ({ responses }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    // sx={{ border: '2px solid red' }}
    <Grid item>
      {responses?.map((response, index) => (
        <Paper key={index} elevation={5}>
          <Accordion
            sx={{
              marginBottom: '20px',
              padding: '20px',
              backgroundColor: `${colors.primary[500]}`,
              boxShadow: '10px',
            }}
          >
            <AccordionSummary
              expandIcon={<MdExpandMore />}
              style={{
                fontFamily: 'Poppins',
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              <Typography variant='h3' color={colors.grey[100]}>
                {response?.user.name}
              </Typography>
            </AccordionSummary>

            {/* <h2>Form ID: {response.formId}</h2> */}
            {response?.response.map((answer) => (
              <AccordionDetails key={answer._id}>
                <Typography variant='h4' color={colors.grey[100]}>
                  {answer.questionText}
                </Typography>

                <Typography variant='h6' color={colors.grey[100]}>
                  Answer: {answer.optionText}
                </Typography>
                {/* <PieChart /> */}
              </AccordionDetails>
            ))}
          </Accordion>
        </Paper>
      ))}
    </Grid>
  );
};

export default ResponseList;
