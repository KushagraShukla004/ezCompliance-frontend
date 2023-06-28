import React, { useEffect } from "react";
import "./ResponseTab.scss";
import { useDispatch, useSelector } from "react-redux";
import { getResponse } from "../../redux/features/form/formSlice";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { useParams } from "react-router-dom";
import { SpinnerImg } from "../../components/loader/Loader";
import { Grid, Typography, useTheme } from "@mui/material";
import ResponseList from "./ResponseList";
import { tokens } from "../../theme";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";

const ResponseTab = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { formId } = useParams();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { response, isLoading, isError, message } = useSelector(
    (state) => state.form
  );

  useEffect(() => {
    if (isLoggedIn && formId !== undefined && formId !== "") {
      dispatch(getResponse(formId));
    }

    if (isError) {
      console.log(message);
    }
  }, [formId, isLoggedIn, isError, message, dispatch]);

  return (
    <section>
      <div className="container">
        <Grid container direction="column" alignItems="center">
          <div className="--flex-center --mb2">
            <span>
              <Typography variant="h3" color={colors.grey[100]}>
                Responses for {response?.[0]?.category}
              </Typography>
            </span>
          </div>
          {isLoading && <SpinnerImg />}
          <Grid item xs={12} sm={5} md={12} sx={{ width: "60vw" }}>
            <ResponseList responses={response} />
          </Grid>
        </Grid>
      </div>
    </section>
  );
};

export default ResponseTab;
