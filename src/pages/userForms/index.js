import React, { useEffect, useState } from "react";
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
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Search from "../../components/search/Search";
import {
  FILTER_FORMS,
  selectFilteredForms,
} from "../../redux/features/form/formFilterSlice";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import ReactPaginate from "react-paginate";
//Icons
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const UserForms = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [search, setSearch] = useState("");

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userRole = useSelector(selectUser);

  const { forms, isLoading, isError, message } = useSelector(
    (state) => state.form
  );

  const filteredForms = useSelector(selectFilteredForms);

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getAllFormsofUser());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  useEffect(() => {
    dispatch(FILTER_FORMS({ forms, search }));
  }, [dispatch, forms, search]);

  //   Begin Pagination
  const [currentForms, setCurrentForms] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 12;

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
      <div className="--flex-between">
        <h2 style={{ color: `${colors.grey[100]}` }}>Forms</h2>
        <Box width="20%">
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </Box>
      </div>
      {userRole?.role === "admin" || "auditor" ? (
        <FormCard forms={currentForms} isLoading={isLoading} />
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

export default UserForms;
