import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useTheme,
  DialogContent,
  DialogActions,
  Dialog,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { tokens } from "../../theme";
import {
  editCategory,
  getAllCategories,
} from "../../redux/features/categories/categorySlice";
import { MdEdit } from "react-icons/md";

const EditCategory = ({ id, category }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [editedCategory, setEditedCategory] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Cat_onChange = (e) => {
    setEditedCategory(e.target.value);
  };

  const updatedCategory = async () => {
    await dispatch(
      editCategory({
        cat_id: id,
        category: editedCategory,
      })
    );
    setOpen(false);
    dispatch(getAllCategories());
  };
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        <MdEdit size={20} color={`${colors.secondary[400]}`} />
      </Button>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        sx={{ color: `${colors.primary[400]}` }}
      >
        <DialogContent>
          <Box
            component="form"
            autoComplete="off"
            sx={{
              p: 1,
              flexGrow: 1,
            }}
          >
            <Typography variant="h3" color={colors.grey[100]}>
              Edit Category :
            </Typography>
            <Typography variant="h3" color={colors.grey[100]}>
              Id: {id}
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
              >
                <TextField
                  variant="outlined"
                  name="category"
                  required
                  defaultValue={category}
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
                  onChange={Cat_onChange}
                />
                <Button
                  onClick={updatedCategory}
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
                    height: 37,
                  }}
                >
                  Edit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <Typography variant="h6" color={colors.grey[100]}>
              Cancel
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditCategory;
