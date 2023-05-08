import { Fragment } from "react";
import { Box, Paper, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

// prev props for Form description, setDescription;
const Header = ({ category }) => {
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
          {category !== "" || category?.length > 0 ? (
            <>
              <Typography
                variant="h4"
                style={{
                  fontFamily: "sans-serif Roboto",
                  marginBottom: "2rem",
                  fontSize: 25,
                  fontWeight: 600,
                  color: `${colors.grey[100]}`,
                }}
              >
                {category}
              </Typography>
            </>
          ) : (
            <>
              <Typography
                variant="h4"
                style={{
                  fontFamily: "sans-serif Roboto",
                  marginBottom: "2rem",
                  fontSize: 25,
                  fontWeight: 600,
                  color: `${colors.grey[100]}`,
                }}
              >
                Select Category
              </Typography>
            </>
          )}
        </Paper>
      </Box>
    </Fragment>
  );
};

export default Header;
