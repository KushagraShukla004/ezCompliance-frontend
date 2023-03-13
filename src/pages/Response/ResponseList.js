import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from '@mui/material';
import { MdExpandMore } from 'react-icons/md';
//eslint-disable-next-line
import PieChart from './PieChart';

const ResponseList = ({ responses }) => {
  return (
    // sx={{ border: '2px solid red' }}
    <Grid item>
      {responses?.map((response, index) => (
        <Accordion
          key={index}
          sx={{
            marginBottom: '20px',
            padding: '20px',
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
            <Typography variant='h3'>{response?.user.name}</Typography>
          </AccordionSummary>

          {/* <h2>Form ID: {response.formId}</h2> */}
          {response?.response.map((answer) => (
            <AccordionDetails key={answer._id}>
              <Typography variant='h4'>{answer.questionText}</Typography>
              {/* <p>Question: {answer.questionText}</p> */}
              <p>Answer: {answer.optionText}</p>
              {/* <PieChart /> */}
            </AccordionDetails>
          ))}
        </Accordion>
      ))}
    </Grid>
  );
};

export default ResponseList;
