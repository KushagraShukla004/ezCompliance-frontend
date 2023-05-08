import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./UserForms.scss";
import FormCard from "./FormCard";
import { getAllFormsofUser } from "../../redux/features/form/formSlice";
import {
  selectIsLoggedIn,
  selectUser,
} from "../../redux/features/auth/authSlice";
import CreateFormDial from "./utils/CreateFormDial";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const UserForms = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userRole = useSelector(selectUser);

  const { forms, isLoading, isError, message } = useSelector(
    (state) => state.form
  );

  console.log(`forms :`, forms);
  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getAllFormsofUser());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <section
      style={{
        marginLeft: "10vw",
        maxWidth: "80vw",
        // border: '2px solid black',
      }}
    >
      <h2 style={{ color: `${colors.grey[100]}` }}>Forms</h2>
      {userRole?.role === "admin" || "auditor" ? (
        <FormCard forms={forms} isLoading={isLoading} />
      ) : (
        <section>
          <div className="--flex-between --flex-dir-column">
            <span>
              <p>Not Authorized</p>
            </span>
          </div>
        </section>
      )}
      <CreateFormDial
        onClick={() => {
          if (userRole?.role === "admin") {
            navigate("/createForm");
          } else {
            navigate("/allForms");
          }
        }}
      />
    </section>
  );
};

export default UserForms;
