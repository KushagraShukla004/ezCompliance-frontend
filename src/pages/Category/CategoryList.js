import React, { useEffect, useState } from "react";
import "./CategoryList.scss";
import { useTheme } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import PageMenu from "../../components/pageMenu/PageMenu";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import {
  deleteCategory,
  getAllCategories,
} from "../../redux/features/categories/categorySlice";
import { tokens } from "../../theme";
// import {
//   deleteCategory,
//   getAllCategories,
// } from '../../redux/features/form/formSlice';
import { SpinnerImg } from "../../components/loader/Loader";
import Search from "../../components/search/Search";
import { shortenText } from "../profile/Profile";
import AddCategory from "./AddCategory";
import { FaTrashAlt } from "react-icons/fa";
import { Button } from "@mui/material";
// import EditDailog from "./utility/DailogBox";
import { confirmAlert } from "react-confirm-alert";
import EditCategory from "./EditCategory";

const CategoryList = () => {
  useRedirectLoggedOutUser("/login");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { categories, isLoading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const delCategory = async (cat_id) => {
    // Await works, don't mind VSCode
    await dispatch(deleteCategory(cat_id));
    dispatch(getAllCategories());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete This Category",
      message: "Are you sure you want to delete this category?.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delCategory(id),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  return (
    <section>
      <div className="container">
        <PageMenu />
        <AddCategory />
        <div className="category-list">
          {isLoading && <SpinnerImg />}
          <div className="cat_table">
            <div className="--flex-between">
              <h3 style={{ color: `${colors.grey[100]}` }}>Categories</h3>
              <span>
                <Search
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </span>
            </div>
            {/*Table*/}
            {categories?.length === 0 ? (
              <p style={{ color: `${colors.grey[100]}` }}>
                No category found....
              </p>
            ) : (
              <table
                // border='1'
                style={{
                  backgroundColor: `${colors.primary[400]}`,
                  color: `${colors.grey[100]}`,
                }}
              >
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Category</th>
                    <th>Created By</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((cat, index) => {
                    const { _id, category, createdBy } = cat;
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{shortenText(category, 20)}</td>
                        <td>{shortenText(createdBy?.name, 20)}</td>
                        <td
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                          }}
                        >
                          <EditCategory id={_id} category={category} />

                          <Button
                            style={{ marginLeft: 6 }}
                            onClick={() => confirmDelete(_id)}
                          >
                            <FaTrashAlt size={20} color={"red"} />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
