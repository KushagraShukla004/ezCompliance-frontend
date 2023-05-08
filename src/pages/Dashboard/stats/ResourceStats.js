import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../../theme";
import { IoFileTrayStacked } from "react-icons/io5";
import StatBox from "./StatBox";
import { useSelector } from "react-redux";
import { selectResources } from "../../../redux/features/resources/resourceSlice";

const ResourceStats = ({ role }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const resources = useSelector(selectResources);

  const totalResources = resources?.length;
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
              title={totalResources}
              subtitle="Total resources"
              progress={totalResources / 10}
              icon={
                <IoFileTrayStacked
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
              title={totalResources}
              subtitle="Total resources"
              progress={totalResources / 10}
              icon={
                <IoFileTrayStacked
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

export default ResourceStats;
