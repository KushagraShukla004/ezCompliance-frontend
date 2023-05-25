import { Fragment, useState } from "react";
import uuid from "react-uuid";
import Nestable from "react-nestable";
import { useNavigate } from "react-router-dom";
//Material UI Components
import {
  Grid,
  IconButton,
  Tooltip,
  Button,
  useTheme,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  // Typography,
} from "@mui/material";
//Icons
import { MdAddCircle } from "react-icons/md";
//Form Elements
import { RadioInput } from "./elements";
//Components
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import {
  createForm,
  selectIsLoading,
} from "../../redux/features/form/formSlice";
import { useEffect } from "react";
import { SpinnerImg } from "../../components/loader/Loader";
import { selectUser } from "../../redux/features/auth/authSlice";
import { tokens } from "../../theme";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { getAllCategories } from "../../redux/features/categories/categorySlice";
// import ExistingQues from '../EditForm/ExistingQues';

export const formEl = [
  {
    label: "Options",
    value: "radio",
  },
];

const FormBuilder = ({ form }) => {
  useRedirectLoggedOutUser("/login");
  const initVal = formEl[0]?.value;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isLoading = useSelector(selectIsLoading);
  const user = useSelector(selectUser);

  //State
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("");
  const [option, setOption] = useState("radio");
  const [optionText, setOptionText] = useState("");

  const items = data;

  // console.log({ data });
  const { categories } = useSelector((state) => state.category);

  // console.log(`category :`, category);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  // console.log('data: ', data);
  useEffect(() => {
    if (form !== undefined) {
      if (form?.questions.length !== 0) {
        setCategory(form?.category);
        setData(form?.questions);
      }
    }
  }, [form]);

  useEffect(() => {
    var optText;
    // eslint-disable-next-line
    data?.map((el) => {
      el?.options &&
        el?.options.map((opt) => {
          return (optText = opt.optionText);
        });
      setOptionText(optText);
    });
  }, [data, optionText]);

  //Function to add new element
  const addElement = () => {
    const data = {
      id: uuid(),
      questionText: null,
      type: option,
      required: false,
    };
    setData((prevState) => [...prevState, data]);
    setOption(initVal);
  };

  //Function to delete element
  const deleteEl = (id) => {
    setData((prevState) => prevState.filter((val) => val.id !== id));
  };

  //Function to add element at specific pos and return arr
  const addAfter = (elArray, index, newEl) => {
    return [...elArray.slice(0, index + 1), newEl, ...elArray.slice(index + 1)];
  };

  //Function to duplicate element
  const duplicateElement = (elId, elType) => {
    let elIdx = data.findIndex((el) => el.id === elId);
    let newEl = {
      id: uuid(),
      questionText: null,
      type: elType,
      required: false,
    };
    let newArr = addAfter(data, elIdx, newEl);
    setData(newArr);
  };

  //Function to handle sorting of elements
  const handleOnChangeSort = ({ items }) => {
    setData(items);
  };

  //Function to Handle Input Values
  const handleValue = (id, e) => {
    let newArr = data.map((el) => {
      if (el.id === id) {
        return { ...el, questionText: e.target.value };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  // //Function to Handle Required
  // const handleRequired = (id) => {
  //   let newArr = data.map((el) => {
  //     if (el.id === id) {
  //       return { ...el, required: !el.required };
  //     } else {
  //       return el;
  //     }
  //   });
  //   setData(newArr);
  // };

  //Function to Handle Element Type
  const handleElType = (id, type) => {
    let newArr = data.map((el) => {
      if (el.id === id) {
        return { ...el, type: type };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  //Function to Handle Options
  const addOption = (id, newOption) => {
    let newArr = data.map((el) => {
      if (el.id === id) {
        const objVal = "options" in el ? el?.options : [];
        return { ...el, options: [...objVal, newOption] };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  //Function to Change Option Values
  const handleOptionValues = (elId, optionId, optionVal) => {
    // console.log({ optionId });
    let newArr = data.map((el) => {
      if (el.id === elId) {
        el?.options &&
          // eslint-disable-next-line
          el?.options.map((opt) => {
            if (opt.id === optionId) {
              opt.optionText = optionVal;
            }
          });
        return el;
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  //Function to Delete Option
  const deleteOption = (elId, optionId) => {
    let newArr = data.map((el) => {
      if (el.id === elId) {
        let newOptions =
          el?.options && el?.options.filter((opt) => opt.id !== optionId);
        return { ...el, options: newOptions };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  //Function to append values to the backend
  const saveForm = () => {
    dispatch(
      createForm({
        createdBy: {
          userId: user?._id,
          name: user?.name,
          email: user?.email,
          role: user?.role,
        },
        category: category,
        questions: data,
      })
    );

    navigate("/forms");
  };

  //Render items
  const renderElements = ({ item }) => {
    // console.log("item.id (in renderElements): ", item.id);
    switch (item.type) {
      case "radio":
        return (
          <RadioInput
            item={item}
            questions={data}
            handleValue={handleValue}
            deleteEl={deleteEl}
            // handleRequired={handleRequired}
            handleElType={handleElType}
            addOption={addOption}
            handleOptionValues={handleOptionValues}
            deleteOption={deleteOption}
            duplicateElement={duplicateElement}
          />
        );

      default:
        return <Fragment></Fragment>;
    }
  };

  return (
    <Fragment>
      {isLoading && <SpinnerImg />}
      <section>
        {form === undefined && (
          <Box
            sx={{
              flexGrow: 1,
              borderBottom: `8px solid ${colors.primary[400]}`,
            }}
          >
            <Grid
              container
              spacing={1}
              // direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography
                variant="h4"
                mt={2}
                mr={2}
                style={{
                  marginBottom: "2rem",
                  fontFamily: "sans-serif Roboto",
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
        )}
        {category && (
          <Grid
            container
            mt={2}
            spacing={1}
            direction="row"
            justifyContent="center"
            sx={{ fontSize: "4em" }}
          >
            <Grid item lg={4.5} md={10} sx={{ ml: 7 }}>
              <Header category={category} />
              <Nestable
                items={items}
                renderItem={renderElements}
                maxDepth={1}
                onChange={handleOnChangeSort}
              />
              <Grid>
                <Box
                  mt={2}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    onClick={saveForm}
                    variant="contained"
                    sx={{
                      color: "white",
                      backgroundColor: `${colors.blueAccent[500]}`,
                      fontSize: 15,
                      transition: "all 0.3s",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        backgroundColor: `${colors.blueAccent[700]}`,
                      },
                      padding: "7.5px 17px",
                    }}
                  >
                    Save
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Grid item md={1}>
              <Tooltip
                title={
                  <p style={{ color: "white", fontSize: "1rem" }}>
                    Add Element
                  </p>
                }
                aria-label="add-element"
              >
                <IconButton
                  aria-label="add-element"
                  onClick={addElement}
                  sx={{ position: "sticky", top: 40 }}
                >
                  <MdAddCircle size={35} color={colors.blueAccent[500]} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        )}
      </section>
    </Fragment>
  );
};
export default FormBuilder;
