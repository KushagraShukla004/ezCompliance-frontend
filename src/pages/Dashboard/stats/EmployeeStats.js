import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { tokens } from "../../../theme";
import PeopleIcon from "@mui/icons-material/People";
import StatBox from "./StatBox";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../redux/features/auth/authSlice";
import { selectForms } from "../../../redux/features/form/formSlice";

const EmployeeStats = ({ role }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { users } = useSelector((state) => state.auth);
  const forms = useSelector(selectForms);

  const totalUsers = users?.length;
  const totalForms = forms?.length;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const stats = (role) => {
    switch (role) {
      case "admin":
        return (
          <Box
            width="100%"
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={totalUsers}
              subtitle="Total Employees"
              progress={totalUsers / 10}
              icon={
                <PeopleIcon
                  style={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        );
      case "auditor":
        return (
          <Box
            width="100%"
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="center"
            // border={2}
          >
            <StatBox
              title={totalForms}
              subtitle="Total Forms"
              progress={totalForms / 10}
              icon={
                <PeopleIcon
                  style={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        );
      default:
        return (
          <Box>
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              Total Audits:
            </Typography>
            <Typography variant="h3" fontWeight="bold" color="secondary">
              3
            </Typography>
          </Box>
        );
    }
  };
  return <>{stats(role)}</>;
};

export default EmployeeStats;
