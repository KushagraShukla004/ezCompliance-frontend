import React, { useEffect, useState } from 'react';
import PageMenu from '../../components/pageMenu/PageMenu';
import Search from '../../components/search/Search';
import UserStats from '../../components/userStats/UserStats';
import { FaCheck, FaTrashAlt } from 'react-icons/fa';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { GrFormPrevious } from 'react-icons/gr';
import './UserList.scss';
import ChangeRole from '../../components/changeRole/ChangeRole';
import { useDispatch, useSelector } from 'react-redux';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import {
  deleteUser,
  getUsers,
  RESET,
  // selectUser,
  verifyUser,
} from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { SpinnerImg } from '../../components/loader/Loader';
import { shortenText } from '../profile/Profile';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {
  FILTER_USERS,
  selectFilteredUsers,
} from '../../redux/features/auth/filterSlice';
import ReactPaginate from 'react-paginate';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  useRedirectLoggedOutUser('/login');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [search, setSearch] = useState('');

  // const user = useSelector(selectUser);

  // console.log('user: ', user);

  const { users, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  // console.log('users: ', users);

  const filteredUsers = useSelector(selectFilteredUsers);

  useEffect(() => {
    if (isError) {
      navigate('/register');
    }
  });

  const delUser = async (id) => {
    // Await works, don't mind VSCode
    await dispatch(deleteUser(id));
    dispatch(getUsers());
  };

  const verifytheUser = async (id) => {
    // console.log(`id (verifyAccount button) :`, id);
    await dispatch(verifyUser({ verificationToken: id }));
    await dispatch(RESET());
    dispatch(getUsers());
  };

  const verifyAccount = (id) => {
    confirmAlert({
      title: 'Verify This User',
      message: 'Are you sure you want to verify this user.',
      buttons: [
        {
          label: 'Verify',
          onClick: () => verifytheUser(id),
        },
        {
          label: 'Cancel',
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete This User',
      message: 'Are you sure you want to delete this user.',
      buttons: [
        {
          label: 'Delete',
          onClick: () => delUser(id),
        },
        {
          label: 'Cancel',
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      // toast.success("User Profile Fetched");
      // console.log(users);
    }

    dispatch(RESET());
  }, [isError, isSuccess, message, dispatch, users]);

  useEffect(() => {
    dispatch(FILTER_USERS({ users, search }));
  }, [dispatch, users, search]);

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredUsers.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredUsers.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredUsers]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  return (
    <section>
      <div className='container'>
        <PageMenu />
        <UserStats />
        <div className='user-list'>
          {isLoading && <SpinnerImg />}
          <div className='table'>
            <div className='--flex-between'>
              <h3 style={{ color: `${colors.grey[100]}` }}>All Users</h3>
              <span>
                <Search
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </span>
            </div>
            {/* Table */}
            {!isLoading && users?.length === 0 ? (
              <p style={{ color: `${colors.grey[100]}` }}>No user found....</p>
            ) : (
              <table
                style={{
                  backgroundColor: `${colors.primary[400]}`,
                  color: `${colors.grey[100]}`,
                }}
              >
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Change Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((user, index) => {
                    const { _id, name, designation, email, role, isVerified } =
                      user;

                    return (
                      <tr key={_id}>
                        <td>{index + 1}</td>
                        <td>{shortenText(name, 10)}</td>
                        <td>{shortenText(designation, 16)}</td>
                        <td>{email}</td>
                        <td>{role}</td>
                        <td>
                          {/* {"Change Role"} */}
                          <ChangeRole _id={_id} email={email} />
                        </td>
                        <td className='icons'>
                          <span>
                            {isVerified ? (
                              <FaCheck
                                size={15}
                                color={'green'}
                                onClick={() => verifyAccount(_id)}
                              />
                            ) : (
                              <FaCheck
                                size={15}
                                color={'red'}
                                onClick={() => verifyAccount(_id)}
                              />
                            )}

                            <FaTrashAlt
                              size={20}
                              color={'red'}
                              style={{ marginLeft: 6 }}
                              onClick={() => confirmDelete(_id)}
                            />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
          <ReactPaginate
            breakLabel='...'
            nextLabel={<NavigateNextIcon size={30} color='white' />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel={
              <GrFormPrevious style={{ color: `${colors.grey[100]}` }} />
            }
            renderOnZeroPageCount={null}
            containerClassName='pagination'
            pageLinkClassName='page-num'
            previousLinkClassName='page-num'
            nextLinkClassName='page-num'
            activeLinkClassName='activePage'
          />
        </div>
      </div>
    </section>
  );
};

export default UserList;
