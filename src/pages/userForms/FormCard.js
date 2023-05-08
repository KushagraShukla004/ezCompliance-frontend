// eslint-disable-next-line
import React, { useState } from "react";

import "./UserForms.scss";
//MUI
import { Card, Box, Typography, useTheme } from "@mui/material";

//backend

import { useDispatch } from "react-redux";
// eslint-disable-next-line
import {
  deleteForm,
  // getAllFormsofUser,
} from "../../redux/features/form/formSlice";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "./utils/Dropdown";
import { tokens } from "../../theme";

const FormCard = ({ forms, responses, user }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(`form :`, forms);
  // console.log(`reponses :`, responses);
  // console.log(`user :`, user);

  const delProduct = async (formId) => {
    await dispatch(deleteForm(formId));
    window.location.reload(true);
  };

  const copyToClipboard = (formId) => {
    navigator.clipboard
      .writeText(window.location.href + `/form/${formId}`)
      .then(() => alert("URL has been copied"))
      .catch((e) => alert(e));
  };
  const confirmDelete = (formId, formTitle) => {
    confirmAlert({
      title: "Delete the Form",
      message: (
        <h3>
          Are you sure you want to delete{" "}
          <b>
            <i>({formTitle})</i>
          </b>{" "}
          form.
        </h3>
      ),
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(formId),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };
  return (
    <section>
      {forms !== undefined ? (
        <div className="--flex-start userform">
          {forms.length === 0 ? (
            <p style={{ color: `${colors.grey[100]}` }}>
              -- No form found, please add a form...
            </p>
          ) : (
            <>
              {forms.map((form, index) => {
                const { _id, category, createdBy, createdAt, updatedAt } = form;
                // console.log(`form :`, form);

                const openForm = () => {
                  navigate(`/forms/form/${_id}`);
                };
                const showResponse = () => {
                  navigate(`/getResponse/${_id}`);
                };
                const editForm = () => {
                  navigate(`/forms/editForm/${_id}`);
                };

                return (
                  <Card
                    key={_id}
                    className="userform_card"
                    sx={{
                      backgroundColor: `${colors.primary[400]}`,
                      boxShadow: "5",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        // border: 2,
                        width: "90%",
                      }}
                      // backgroundColor={colors.primary[400]}
                    >
                      <Typography noWrap variant="h4" color={colors.grey[100]}>
                        {category}
                      </Typography>
                      <Typography noWrap variant="h5" color="text.secondary">
                        Created By - <b>{createdBy?.name}</b>
                      </Typography>
                      <Typography noWrap variant="h5" color="text.secondary">
                        Created At - {createdAt?.slice(0, 10)}
                      </Typography>
                      <Typography noWrap variant="h5" color="text.secondary">
                        Updated - {updatedAt?.slice(0, 10)}
                      </Typography>
                    </Box>
                    <div>
                      <Dropdown
                        id={_id}
                        openForm={openForm}
                        editForm={editForm}
                        showResponse={showResponse}
                        copyToClipboard={() => copyToClipboard(_id)}
                        deleteForm={() => confirmDelete(_id, category)}
                      />
                    </div>
                  </Card>
                );
              })}
            </>
          )}
        </div>
      ) : (
        <>
          <div className="--flex-start userform">
            {responses.length === 0 ? (
              <p style={{ color: `${colors.grey[100]}` }}>
                -- No Response found, please add a Response...
              </p>
            ) : (
              <>
                {responses.map((response, index) => {
                  const { _id, formId, resForm, createdAt } = response;
                  // console.log(`response :`, response);

                  const openForm = () => {
                    navigate(`/forms/form/${formId}`);
                  };
                  const showResponse = () => {
                    navigate(`/getResponse/${formId}`);
                  };

                  return (
                    <Card
                      key={_id}
                      className="userform_card"
                      sx={{
                        backgroundColor: `${colors.primary[400]}`,
                        boxShadow: "5",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          // border: 2,
                          width: "90%",
                        }}
                      >
                        <Typography
                          noWrap
                          variant="h4"
                          color={colors.grey[100]}
                        >
                          {resForm?.category}
                        </Typography>
                        <Typography noWrap variant="h5">
                          Created By - <b>{resForm?.createdBy.name}</b>
                        </Typography>
                        <Typography noWrap variant="h5" color="text.secondary">
                          Filled By - <b>{user}</b>
                        </Typography>
                        <Typography noWrap variant="h5" color="text.secondary">
                          Created At - {createdAt.slice(0, 10)}
                        </Typography>
                      </Box>
                      <div>
                        <Dropdown
                          id={_id}
                          openForm={openForm}
                          showResponse={showResponse}
                          copyToClipboard={() => copyToClipboard(_id)}
                          deleteForm={() =>
                            confirmDelete(_id, resForm?.category)
                          }
                        />
                      </div>
                    </Card>
                  );
                })}
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default FormCard;
