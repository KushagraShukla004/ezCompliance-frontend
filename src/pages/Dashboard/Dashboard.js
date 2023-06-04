import React /*{ useState }*/ from "react";
import {
  Box,
  Button,
  IconButton,
  InputBase,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import "./Dashboard.scss";
import DownloadIcon from "@mui/icons-material/Download";
import { BiSearch } from "react-icons/bi";
import TrafficIcon from "@mui/icons-material/Traffic";
import RecentFormsTable from "./stats/RecentFormsTable";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/authSlice";
import { NavLink, useNavigate } from "react-router-dom";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import ResourcesTable from "./stats/ResourcesTable";
import FormStats from "./stats/FormStats";
import ResourceStats from "./stats/ResourceStats";
import EmployeeStats from "./stats/EmployeeStats";
import StatBox from "./stats/StatBox";

const Dashboard = () => {
  useRedirectLoggedOutUser("/login");
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const user = useSelector(selectUser);

  const createResponse = () => {
    navigate("/creatingResponse");
  };
  const createForm = () => {
    navigate("/forms");
  };

  return (
    <section>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h2 style={{ color: `${colors.grey[100]}` }}>Dashboard</h2>
        {user?.role === "auditor" ? (
          <Box>
            <Button
              onClick={createResponse}
              variant="contained"
              sx={{
                backgroundColor: `${colors.secondary[700]}`,
                fontSize: 13,
                color: "white",
                transition: "all 0.3s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  backgroundColor: `${colors.secondary[900]}`,
                },
                padding: "10px 20px",
              }}
            >
              Create an Audit
            </Button>
          </Box>
        ) : (
          <Box>
            <Button
              onClick={createForm}
              variant="contained"
              sx={{
                backgroundColor: `${colors.secondary[700]}`,
                fontSize: 13,
                color: "white",
                transition: "all 0.3s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  backgroundColor: `${colors.secondary[900]}`,
                },
                padding: "10px 20px",
              }}
            >
              Create a Form
            </Button>
          </Box>
        )}
      </Box>
      {/*Grids */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="100px"
        gap="20px"
        wrap="wrap"
        marginTop={3}
      >
        {/* Row 1*/}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow={5}
        >
          <FormStats role={user?.role} />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow={5}
        >
          <ResourceStats role={user?.role} />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow={5}
        >
          <EmployeeStats role={user?.role} />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow={5}
        >
          <StatBox
            title="1,325,134"
            subtitle="Traffic Received"
            progress="0.80"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* ROW 2 */}
        <Box
          gridColumn="span 7"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          boxShadow={5}
          overflow="auto"
        >
          <Box
            mt="15px"
            p="0 0 10px 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`8px solid ${colors.primary[500]}`}
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Resources
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadIcon color="secondary" sx={{ fontSize: "2.3em" }} />
              </IconButton>
            </Box>
          </Box>
          <Box>
            <ResourcesTable />
          </Box>
        </Box>
        {/* Row 3*/}
        <Box
          gridColumn="span 5"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          boxShadow={5}
          // border={2}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`9px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            {user?.role === "admin" ? (
              <Box component={NavLink} to="/forms">
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                  Recent Forms Created
                </Typography>
              </Box>
            ) : (
              <Box component={NavLink} to="/responses">
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                  Recent Forms Filled
                </Typography>
              </Box>
            )}
            {/* SEARCH BAR */}
            <Box
              display="flex"
              backgroundColor={colors.grey[400]}
              borderRadius="3px"
            >
              <InputBase
                sx={{ ml: 2, flex: 1, fontSize: "2em" }}
                placeholder="Search"
              />
              <IconButton type="button" sx={{ p: 1 }}>
                <BiSearch size={18} />
              </IconButton>
            </Box>
          </Box>
          <Box>
            <RecentFormsTable isRole={user?.role} />
          </Box>
        </Box>
      </Box>
    </section>
  );
};

export default Dashboard;
