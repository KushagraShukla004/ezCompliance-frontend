import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/categories/`;

//create Category
const addCategory = async (CategoryData) => {
  const category = await axios.post(API_URL, CategoryData);
  return category.data;
};
// Get all the Categorys
const getAllCategories = async () => {
  const category = await axios.get(API_URL);
  return category.data;
};

// Delete Category
const deleteCategory = async (cat_id) => {
  const category = await axios.delete(API_URL + cat_id);
  return category.data;
};
// Get a Category
const editCategory = async (UpdatedCategoryData) => {
  const category = await axios.patch(API_URL, UpdatedCategoryData);
  return category.data;
};

const categoryService = {
  addCategory,
  getAllCategories,
  deleteCategory,
  editCategory,
};

export default categoryService;
