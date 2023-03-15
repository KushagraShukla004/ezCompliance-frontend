// eslint-disable-next-line
import React, { useState } from 'react';

import './UserForms.scss';
//MUI
import { Card, Box, Typography } from '@mui/material';

//backend

import { useDispatch } from 'react-redux';
// eslint-disable-next-line
import {
  deleteForm,
  // getAllFormsofUser,
} from '../../redux/features/form/formSlice';
import { SpinnerImg } from '../../components/loader/Loader';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from './utils/Dropdown';

const FormCard = ({ forms, isLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log('forms: ', forms);
  const delProduct = async (formId) => {
    console.log(formId);

    await dispatch(deleteForm(formId));
    window.location.reload(true);
  };

  const copyToClipboard = (formId) => {
    navigator.clipboard
      .writeText(window.location.href + `/form/${formId}`)
      .then(() => alert('URL has been copied'))
      .catch((e) => alert(e));
  };
  const confirmDelete = (formId, formTitle) => {
    confirmAlert({
      title: 'Delete the Form',
      message: (
        <h3>
          Are you sure you want to delete{' '}
          <b>
            <i>({formTitle})</i>
          </b>{' '}
          form.
        </h3>
      ),
      buttons: [
        {
          label: 'Delete',
          onClick: () => delProduct(formId),
        },
        {
          label: 'Cancel',
          // onClick: () => alert('Click No')
        },
      ],
    });
  };
  return (
    <section
      key={3}
      style={{
        marginLeft: '10vw',
        maxWidth: '80vw',
      }}
    >
      <div className='--flex-between --flex-dir-column'>
        <span>
          <h3>Forms</h3>
        </span>
      </div>
      {isLoading && <SpinnerImg />}
      <div className='--flex-start userform'>
        {forms.length === 0 ? (
          <p>-- No form found, please add a form...</p>
        ) : (
          <>
            {forms.map((form, index) => {
              const { _id, title, createdBy, updatedAt } = form;
              const openForm = () => {
                navigate(`/forms/form/${_id}`);
              };
              const showResponse = () => {
                navigate(`/responses/getResponse/${_id}`);
              };

              return (
                <Card key={_id} className='userform_card'>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      // border: 2,
                      width: '90%',
                    }}
                  >
                    <Typography noWrap variant='h4'>
                      {title}
                    </Typography>
                    <Typography noWrap variant='h5' color='text.secondary'>
                      Created By - <b>{createdBy?.name}</b>
                    </Typography>
                    <Typography noWrap variant='h5' color='text.secondary'>
                      Updated - {updatedAt}
                    </Typography>
                  </Box>
                  <div>
                    <Dropdown
                      id={_id}
                      openForm={openForm}
                      showResponse={showResponse}
                      copyToClipboard={() => copyToClipboard(_id)}
                      deleteForm={() => confirmDelete(_id, title)}
                    />
                  </div>
                </Card>
              );
            })}
          </>
        )}
      </div>
    </section>
  );
};

export default FormCard;
