import { useSelector } from 'react-redux';
import {
  selectIsLoggedIn,
  selectUser,
} from '../../redux/features/auth/authSlice';

export const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return <> {children}</>;
  }
  return null;
};

export const ShowOnLogout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return <> {children}</>;
  }
  return null;
};

//Access to Users page only to admin and auditor
export const AdminLink = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userRole = useSelector(selectUser);

  if (
    isLoggedIn &&
    //if want to allow auditor to see users as well ,,, then add '|| userRole?.role === 'auditor' ' after 'admin' below
    userRole?.role === 'admin'
  ) {
    return <> {children}</>;
  }
  return null;
};
//Access to Users page only to auditor
export const AuditorLink = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userRole = useSelector(selectUser);

  if (
    isLoggedIn &&
    //if want to allow auditor to see users as well ,,, then add '|| userRole?.role === 'auditor' ' after 'admin' below
    userRole?.role === 'auditor'
  ) {
    return <> {children}</>;
  }
  return null;
};

//Access to Users page only to admin and auditor
export const AdminAuditorForms = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userRole = useSelector(selectUser);

  if (
    isLoggedIn &&
    (userRole?.role === 'admin' || userRole?.role === 'auditor')
  ) {
    return <> {children}</>;
  }
  return null;
};
