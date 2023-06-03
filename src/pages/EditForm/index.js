import React, { useEffect, useState } from "react";
import { Box, Button, Grid, IconButton, Tooltip } from "@mui/material";
import uuid from "react-uuid";
import { useTheme } from "@mui/system";
import { tokens } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { editForm, getFormById } from "../../redux/features/form/formSlice";
import { SpinnerImg } from "../../components/loader/Loader";
import Header from "./Header";
import { MdAddCircle } from "react-icons/md";
import ExistingQues from "./ExistingQues";
import ErrorPage from "../ErrorPage";

const EditForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formId } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { form, isLoading, isError, message } = useSelector(
    (state) => state.form
  );

  //State
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const [category, setCategory] = useState("");
  const [optionText, setOptionText] = useState("");

  // console.log(`data in index.js EditForm:`, data);

  useEffect(() => {
    if (form !== undefined) {
      if (form?.questions.length !== 0) {
        setCategory(form?.category);
        setData(form?.questions);
      }
    }
  }, [form]);
  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getFormById(formId));
    }

    if (isError) {
      console.log(message);
    }
    //eslint-disable-next-line
  }, [isLoggedIn, isError, message, dispatch]);

  //Function to add new element
  const addElement = () => {
    const data = {
      id: uuid(),
      questionText: "",
    };
    setData((prevState) => [...prevState, data]);
  };

  //Function to delete element
  const deleteEl = (id) => {
    setData((prevState) => {
      return prevState.filter((val) => (val._id || val.id) !== id);
    });
  };

  //Function to add element at specific pos and return arr
  const addAfter = (elArray, index, newEl) => {
    return [...elArray.slice(0, index + 1), newEl, ...elArray.slice(index + 1)];
  };

  //Function to duplicate element
  const duplicateElement = (elId) => {
    let elIdx = data.findIndex((el) => el.id === elId || el._id === elId);
    let newEl = {
      _id: uuid(),
      questionText: "",
    };
    let newArr = addAfter(data, elIdx, newEl);
    setData(newArr);
  };

  //Function to Handle Input Values
  const handleValue = (id, e) => {
    let newArr = data.map((el) => {
      if (el?._id === id || el.id === id) {
        return { ...el, questionText: e.target.value };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  //Function to Handle Element Type
  const handleElType = (id, type) => {
    let newArr = data.map((el) => {
      if (el._id === id || el.id === id) {
        return { ...el, type: type };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  //Function to Handle Options
  const addOption = (ques_id, newOption) => {
    let newArr = data.map((el) => {
      if (el._id === ques_id || el.id === ques_id) {
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
    let newArr = data.map((el) => {
      if (el._id === elId) {
        const updatedOptions = el.options.map((opt) => {
          if (opt._id === optionId || opt.id === optionId) {
            return { ...opt, optionText: optionVal };
          }
          return opt;
        });

        return { ...el, options: updatedOptions };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

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

  useEffect(() => {
    setFormData({ category: category, questions: data });
  }, [category, data]);

  //Function to Delete Option
  const deleteOption = (elId, optionId) => {
    let newArr = data.map((el) => {
      if (el._id === elId || el.id === elId) {
        let newOptions =
          el?.options &&
          el?.options.filter((opt) => opt.id || opt._id !== optionId);
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
      editForm({
        formId: form?._id,
        formData: formData,
      })
    );

    navigate("/forms");
  };

  return (
    <section>
      <br />
      {isLoading && <SpinnerImg />}
      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="center"
        sx={{ fontSize: "4em" }}
      >
        <Grid item lg={4.5} md={10} sx={{ ml: 7 }}>
          <Header category={category} />
          {data !== [] ? (
            <ExistingQues
              questions={data}
              handleValue={handleValue}
              deleteEl={deleteEl}
              handleElType={handleElType}
              addOption={addOption}
              handleOptionValues={handleOptionValues}
              deleteOption={deleteOption}
              duplicateElement={duplicateElement}
            />
          ) : (
            <ErrorPage />
          )}

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
              <p style={{ color: "white", fontSize: "1rem" }}>Add Element</p>
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
    </section>
  );
};

export default EditForm;
