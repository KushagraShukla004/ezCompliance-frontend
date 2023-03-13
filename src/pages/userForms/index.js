import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import Card from '../../components/card/Card';
import './UserForms.scss';
import FormCard from './FormCard';
import { getAllFormsofUser } from '../../redux/features/form/formSlice';
import {
  selectIsLoggedIn,
  selectUser,
} from '../../redux/features/auth/authSlice';
import CreateFormDial from './utils/CreateFormDial';

const UserForms = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userRole = useSelector(selectUser);
  const { forms, isLoading, isError, message } = useSelector(
    (state) => state.form
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getAllFormsofUser());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <section>
      {userRole?.role === 'auditor' ? (
        <FormCard forms={forms} isLoading={isLoading} />
      ) : (
        <section>
          <div className='--flex-between --flex-dir-column'>
            <span>
              <h3>Forms</h3>
              <p>Not Authorized</p>
            </span>
          </div>
        </section>
      )}
      <CreateFormDial
        onClick={() => {
          navigate('/createForm');
        }}
      />
    </section>
  );
};

export default UserForms;
