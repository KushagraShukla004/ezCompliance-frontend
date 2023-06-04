import { useTheme } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/authSlice";
// import { addCategory, getAllCategories } from '../../redux/features/form/formSlice';
import {
  addCategory,
  getAllCategories,
} from "../../redux/features/categories/categorySlice";
import { tokens } from "../../theme";
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const AddCategory = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const user = useSelector(selectUser);
  const [newCategory, setNewCategory] = useState("");

  const Cat_handleInputChange = (e) => {
    e.preventDefault();
    const categoryValue = e.target.value;
    setNewCategory(categoryValue);
  };

  const AddCategory = async () => {
    await dispatch(
      addCategory({
        createdBy: {
          userId: user?._id,
          name: user?.name,
          email: user?.email,
          role: user?.role,
        },
        category: newCategory,
      })
    );
    dispatch(getAllCategories());
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      sx={{
        p: 1,
        flexGrow: 1,
      }}
    >
      <Typography variant="h3" color={colors.grey[100]}>
        Add a Category :
      </Typography>
      <Grid container spacing={1} direction="row">
        <Grid
          item
          lg={7}
          md={8}
          mt={2}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            pt: 1,
          }}
          // border={2}
          // borderColor='red'
        >
          <TextField
            variant="outlined"
            name="category"
            required
            placeholder="category"
            //   defaultValue={resource?.emp_Id}
            sx={{
              mb: 2,
              "& input": {
                color: colors.grey[50],
              },
              width: "55%",
            }}
            size="small"
            inputProps={{
              style: {
                height: 20,
                fontSize: 20,
                backgroundColor: colors.primary[400],
              },
            }}
            onChange={Cat_handleInputChange}
          />
          <Button
            onClick={AddCategory}
            variant="contained"
            sx={{
              ml: 3,
              color: "white",
              backgroundColor: `${colors.blueAccent[500]}`,
              fontSize: 12,
              transition: "all 0.3s",
              "&:hover": {
                transform: "translateY(-2px)",
                backgroundColor: `${colors.blueAccent[700]}`,
              },
              // padding: '7px 7px',
              height: 37,
            }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      <Divider />
    </Box>
  );
};

export default AddCategory;
