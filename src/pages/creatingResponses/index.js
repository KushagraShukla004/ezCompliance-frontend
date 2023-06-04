// import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  selectFilteredForms,
  FILTER_FORMS_CATEGORY,
} from "../../redux/features/form/formFilterSlice";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import { getAllCategories } from "../../redux/features/categories/categorySlice";
import { tokens } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { getAllForms } from "../../redux/features/form/formSlice";
import {
  selectIsLoggedIn,
  selectUser,
} from "../../redux/features/auth/authSlice";
import ReactPaginate from "react-paginate";
import FormCard from "../userForms/FormCard";
import EmployeeDetails from "./EmployeeDetails";
//Icons
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Search from "../../components/search/Search";
import { SpinnerImg } from "../../components/loader/Loader";
import { selectEmpDetails } from "../../redux/features/form/EmployeeDetailsSlice";
// import { toast } from "react-toastify";

const CreateResponse = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userRole = useSelector(selectUser);
  const EmpDetails = useSelector(selectEmpDetails);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const { forms, isLoading, isError, message } = useSelector(
    (state) => state.form
  );

  const filteredForms = useSelector(selectFilteredForms);

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getAllForms());
    }
    if (isError) {
      console.log(message);
    }
    //eslint-disable-next-line
  }, [isLoggedIn, isError, message, dispatch]);

  useEffect(() => {
    dispatch(FILTER_FORMS_CATEGORY({ forms, category }));
    if (search !== "") {
      dispatch(FILTER_FORMS_CATEGORY({ forms, category, search }));
    }
  }, [dispatch, forms, search, category, userRole, EmpDetails]);

  const handleCategory = (e) => {
    if (userRole?.role === "auditor" && EmpDetails.length === 0) {
      alert("Please Fill the Employee Details First.");
    } else {
      setCategory(e.target.value);
    }
  };

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
      <Box
        sx={{
          borderBottom: `8px solid ${colors.primary[400]}`,
        }}
      >
        <Box display="flex" mb={3} justifyContent="center">
          <EmployeeDetails />
        </Box>
        <Grid container spacing={1} justifyContent="center" alignItems="center">
          <Typography
            variant="h4"
            mt={2}
            mr={2}
            style={{
              fontFamily: "sans-serif Roboto",
              marginBottom: "2rem",
              fontSize: 25,
              fontWeight: 600,
              color: `${colors.grey[100]}`,
            }}
          >
            Select Category
          </Typography>
          <FormControl sx={{ width: "20rem" }}>
            <InputLabel
              id="el-category-label"
              sx={{
                color: `${colors.grey[100]}`,
                "&.Mui-focused": {
                  color: `${colors.grey[100]}`,
                },
              }} // font size of input label
            >
              Category
            </InputLabel>
            <Select
              labelId="el-category-label"
              id="el-category"
              label="Category"
              defaultValue=""
              sx={{
                fontSize: 15,
                ".MuiOutlinedInput-notchedOutline": {
                  fontSize: 20,
                  borderColor: `${colors.grey[100]}`,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: `${colors.grey[100]}`,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: `${colors.grey[100]}`,
                },
                ".MuiSvgIcon-root ": {
                  fill: `${colors.grey[100]} !important`,
                },
              }}
              size="medium"
              onChange={handleCategory}
            >
              {categories &&
                categories?.map((cat_el, key) => (
                  <MenuItem
                    sx={{ fontSize: 14.5 }}
                    key={key}
                    value={cat_el?.category}
                  >
                    {cat_el?.category}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
      </Box>
      {category && (
        <>
          {isLoading && <SpinnerImg />}
          <div className="--flex-between">
            <h2 style={{ color: `${colors.grey[100]}` }}>Forms</h2>
            <Box width="20%">
              <Search
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
          </div>
          {userRole?.role === "auditor" ? (
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
        </>
      )}
    </section>
  );
};

export default CreateResponse;
