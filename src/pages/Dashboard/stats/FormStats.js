import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { tokens } from "../../../theme";
import { FaWpforms } from "react-icons/fa";
import StatBox from "./StatBox";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllFormsofUser,
  getAllResponseForms,
} from "../../../redux/features/form/formSlice";

const FormStats = ({ role }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { forms, responses, isError, message } = useSelector(
    (state) => state.form
  );

  useEffect(() => {
    if (role === "auditor") {
      dispatch(getAllResponseForms());
    }
    if (role === "admin") {
      dispatch(getAllFormsofUser());
    }
    if (isError) {
      console.log(message);
    }
  }, [dispatch, isError, message, role]);

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
              title={forms?.length}
              subtitle="Total forms Made"
              progress="0.75"
              icon={
                <FaWpforms
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
              title={responses?.length}
              subtitle="Audits Made"
              progress="0.75"
              icon={
                <FaWpforms
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

export default FormStats;
