import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SpinnerImg } from '../../components/loader/Loader';
import {
  selectIsLoggedIn,
  selectUser,
} from '../../redux/features/auth/authSlice';
import { getAllForms } from '../../redux/features/form/formSlice';
import FormCard from '../userForms/FormCard';

const AllForms = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userRole = useSelector(selectUser);
  const [alltheForms, setAlltheForms] = useState([]);
  console.log('alltheforms: ', alltheForms);
  const { forms, isLoading, isError, message } = useSelector(
    (state) => state.form
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getAllForms());
    }
    setAlltheForms(forms);
    if (isError) {
      console.log(message);
    }
    //eslint-disable-next-line
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className='container'>
      {isLoading && <SpinnerImg />}
      {userRole?.role === 'admin' || userRole?.role === 'auditor' ? (
        <FormCard forms={forms} isLoading={isLoading} />
      ) : (
        <section>
          <div className='--flex-between --flex-dir-column'>
            <span>
              <h3>All Forms</h3>
              <p>Not Authorized</p>
            </span>
          </div>
        </section>
      )}
    </div>
  );
};

export default AllForms;
