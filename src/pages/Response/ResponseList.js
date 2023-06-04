import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { MdExpandMore } from "react-icons/md";
import { tokens } from "../../theme";

const ResponseList = ({ responses }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Grid item>
      {responses?.map((response, index) => (
        <Paper key={index} elevation={5} sx={{ marginBottom: "10px" }}>
          <Accordion
            sx={{
              marginBottom: "20px",
              padding: "20px",
              backgroundColor: `${colors.primary[500]}`,
              boxShadow: "10px",
            }}
          >
            <AccordionSummary
              expandIcon={<MdExpandMore />}
              sx={{
                fontFamily: "Poppins",
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              <Grid container justifyContent="space-between">
                <Box mb={1}>
                  <Typography variant="h3" color={colors.grey[100]}>
                    Audit For : {response?.employee?.name}
                  </Typography>
                  <Typography mt={2} variant="h3" color={colors.grey[100]}>
                    Auditor : {response?.user.name}
                  </Typography>
                </Box>
                <Grid item mr={2}>
                  <Typography variant="h4" color={colors.grey[100]}>
                    Created on
                  </Typography>
                  <Typography variant="h5" color={colors.grey[100]}>
                    D: {response?.createdAt.slice(0, 10)}
                  </Typography>
                  <Typography variant="h5" color={colors.grey[100]}>
                    T: {response?.createdAt.slice(11, 19)}
                  </Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <Box mb={2} ml={2}>
              <Typography
                mb={2}
                variant="h4"
                fontWeight={600}
                color={colors.grey[100]}
              >
                Employee Details :
              </Typography>
              <Grid
                container
                gap={2}
                sx={{
                  borderBottom: `1px solid ${colors.primary[300]}`,
                }}
              >
                <Typography noWrap fontSize={17} color={colors.grey[100]}>
                  ID: <b>{response?.employee?.empId}</b>
                </Typography>
                <Typography noWrap fontSize={17} color={colors.grey[100]}>
                  Name: <b>{response?.employee?.name}</b>
                </Typography>
                <Typography noWrap fontSize={17} color={colors.grey[100]}>
                  Email: <b>{response?.employee?.email}</b>
                </Typography>
                <Typography noWrap fontSize={17} color={colors.grey[100]}>
                  Role: <b>{response?.employee?.designation}</b>
                </Typography>
              </Grid>
            </Box>
            <Typography
              mt={3}
              ml={2}
              variant="h4"
              fontWeight={600}
              color={colors.grey[100]}
            >
              Response :
            </Typography>
            {response?.response.map((answer) => (
              <AccordionDetails key={answer._id}>
                <Typography variant="h4" color={colors.grey[100]}>
                  {answer.questionText}
                </Typography>
                <Typography variant="h6" color={colors.grey[100]}>
                  Answer: {answer.optionText}
                </Typography>
              </AccordionDetails>
            ))}
          </Accordion>
        </Paper>
      ))}
    </Grid>
  );
};

export default ResponseList;
