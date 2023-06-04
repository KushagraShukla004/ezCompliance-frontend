import { useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SpinnerImg } from "../../components/loader/Loader";
import {
  selectIsLoggedIn,
  selectUser,
} from "../../redux/features/auth/authSlice";
import { getAllResponseForms } from "../../redux/features/form/formSlice";
import { tokens } from "../../theme";
import FormCard from "../userForms/FormCard";
import CreateFormDial from "../userForms/utils/CreateFormDial";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";

const UserResponses = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const User = useSelector(selectUser);
  const { responses, isLoading, isError, message } = useSelector(
    (state) => state.form
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getAllResponseForms());
    }
    if (isError) {
      console.log(message);
    }
  }, [dispatch, isError, message, isLoggedIn]);

  return (
    <section
      style={{
        marginLeft: "10vw",
        maxWidth: "80vw",
        maxHeight: "40vh",
      }}
    >
      {isLoading && <SpinnerImg />}
      <div>
        <h3 style={{ color: `${colors.grey[100]}` }}>Recently Filled Forms</h3>
      </div>
      <div className="--flex-center">
        {User?.role === "auditor" ? (
          <FormCard responses={responses} user={User.name} />
        ) : (
          <h1>Not Authorized</h1>
        )}
      </div>
      <CreateFormDial
        onClick={() => {
          if (User?.role === "admin") {
            navigate("/createForm");
          } else {
            navigate("/creatingResponse");
          }
        }}
      />
    </section>
  );
};

export default UserResponses;
