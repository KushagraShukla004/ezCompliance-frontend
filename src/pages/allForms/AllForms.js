import { Box, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SpinnerImg } from "../../components/loader/Loader";
import {
  selectIsLoggedIn,
  selectUser,
} from "../../redux/features/auth/authSlice";
import { getAllForms } from "../../redux/features/form/formSlice";
import { tokens } from "../../theme";
import FormCard from "../userForms/FormCard";
import PageMenu from "../../components/pageMenu/PageMenu";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import {
  FILTER_FORMS,
  selectFilteredForms,
} from "../../redux/features/form/formFilterSlice";
import ReactPaginate from "react-paginate";
//Icons
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Search from "../../components/search/Search";

const AllForms = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userRole = useSelector(selectUser);

  const [search, setSearch] = useState("");

  const { forms, isLoading, isError, message } = useSelector(
    (state) => state.form
  );
  const filteredForms = useSelector(selectFilteredForms);

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getAllForms());
    }
    // setAlltheForms(forms);
    if (isError) {
      console.log(message);
    }
    //eslint-disable-next-line
  }, [isLoggedIn, isError, message, dispatch]);

  useEffect(() => {
    dispatch(FILTER_FORMS({ forms, search }));
  }, [dispatch, forms, search]);

  //   Begin Pagination
  const [currentForms, setCurrentForms] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentForms(filteredForms.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredForms.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredForms]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredForms.length;
    setItemOffset(newOffset);
  };
  //   End Pagination
  return (
    <section
      style={{
        marginLeft: "10vw",
        maxWidth: "80vw",
      }}
    >
      {isLoading && <SpinnerImg />}
      <PageMenu />
      <div className="--flex-between">
        <h2 style={{ color: `${colors.grey[100]}` }}>Forms</h2>
        <Box width="20%">
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </Box>
      </div>
      {userRole?.role === "admin" || userRole?.role === "auditor" ? (
        <FormCard forms={currentForms} isLoading={isLoading} />
      ) : (
        <section>
          <div className="--flex-between --flex-dir-column">
            <span>
              <h3>All Forms</h3>
              <p>Not Authorized</p>
            </span>
          </div>
        </section>
      )}
      <ReactPaginate
        breakLabel="..."
        nextLabel={<ArrowForwardIosIcon />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel={<ArrowBackIosNewIcon />}
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="activePage"
      />
    </section>
  );
};

export default AllForms;
