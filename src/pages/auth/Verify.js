import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import { RESET, verifyUser } from '../../redux/features/auth/authSlice';

const Verify = () => {
  const dispatch = useDispatch();
  const { verificationToken } = useParams();

  console.log(`verificationToken :`, verificationToken);

  const { isLoading } = useSelector((state) => state.auth);

  const verifyAccount = async () => {
    await dispatch(verifyUser(verificationToken));
    await dispatch(RESET());
  };

  return (
    <section>
      {isLoading && <Loader />}
      <div className='container'>
        <div className='--center-all'>
          <h2>Account Verification</h2>
          <p>To verify your account, click the button below...</p>
          <br />

          <button className='--btn --btn-primary' onClick={verifyAccount}>
            Verify Account
          </button>
        </div>
      </div>
    </section>
  );
};

export default Verify;
