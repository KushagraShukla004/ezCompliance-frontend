import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  //     Box,
  //   Paper,
  //   TextField,
  //   Typography,
} from '@mui/material';
import uuid from 'react-uuid';
import Nestable from 'react-nestable';
import { useTheme } from '@mui/system';
import { tokens } from '../../theme';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  selectIsLoggedIn,
  //   selectUser,
} from '../../redux/features/auth/authSlice';
import { getFormById } from '../../redux/features/form/formSlice';
// import FormBuilder from '../FormBuilder';
import { SpinnerImg } from '../../components/loader/Loader';
import Header from './Header';
// import RadioInput from './elements/RadioInput';
import { MdAddCircle } from 'react-icons/md';
import ExistingQues from './ExistingQues';
import { RadioInput } from '../FormBuilder/elements';

export const formEl = [
  {
    label: 'Options',
    value: 'radio',
  },
];

const EditForm = () => {
  const initVal = formEl[0]?.value;
  const dispatch = useDispatch();
  //   const navigate = useNavigate();
  //   const user = useSelector(selectUser);
  const { formId } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { form, isLoading, isError, message } = useSelector(
    (state) => state.form
  );

  // console.log(`form :`, form);
  //State
  const [data, setData] = useState([]);
  const [category, setCategory] = useState('');
  const [option, setOption] = useState('radio');
  const [optionText, setOptionText] = useState('');

  const items = data;

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
    console.log('id in handleValue', id);
    let newArr = data.map((el) => {
      console.log('el in handleValue', el);
      console.log('el._id in handleValue', el?._id);
      if (el?._id === id) {
        return { ...el, questionText: e.target.value };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

  //   //Function to Handle Required
  //   const handleRequired = (id) => {
  //     let newArr = data.map((el) => {
  //       if (el.id === id) {
  //         return { ...el, required: !el.required };
  //       } else {
  //         return el;
  //       }
  //     });
  //     setData(newArr);
  //   };

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
    console.log({ newOption });
    let newArr = data.map((el) => {
      console.log({ el });
      if (el.id === id) {
        const objVal = 'options' in el ? el?.options : [];
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

  //   //Function to append values to the backend
  //   const saveForm = () => {
  //     dispatch(
  //       createForm({
  //         createdBy: {
  //           userId: user?._id,
  //           name: user?.name,
  //           email: user?.email,
  //           role: user?.role,
  //         },
  //         category: category,
  //         questions: data,
  //       })
  //     );

  //     navigate('/forms');
  //   };
  //Render items
  const renderElements = ({ item }) => {
    // console.log('item.id (in renderElements): ', item.id);
    switch (item.type) {
      case 'radio':
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
        return <></>;
    }
  };

  return (
    <section>
      <br />
      {isLoading && <SpinnerImg />}
      <Grid
        container
        spacing={1}
        direction='row'
        justifyContent='center'
        sx={{ fontSize: '4em' }}
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
            <Nestable
              items={items}
              renderItem={renderElements}
              maxDepth={1}
              onChange={handleOnChangeSort}
            />
          )}

          <Grid>
            <Box
              mt={2}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                // onClick={saveForm}
                variant='contained'
                sx={{
                  color: 'white',
                  backgroundColor: `${colors.blueAccent[500]}`,
                  fontSize: 15,
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    backgroundColor: `${colors.blueAccent[700]}`,
                  },
                  padding: '7.5px 17px',
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
              <p style={{ color: 'white', fontSize: '1rem' }}>Add Element</p>
            }
            aria-label='add-element'
          >
            <IconButton
              aria-label='add-element'
              onClick={addElement}
              sx={{ position: 'sticky', top: 40 }}
            >
              <MdAddCircle size={35} color={colors.blueAccent[500]} />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      {/* <FormBuilder form={form} /> */}
    </section>
  );
};

export default EditForm;

// const EditForm = () => {
//   const { formId } = useParams();
//   const dispatch = useDispatch();
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const isLoggedIn = useSelector(selectIsLoggedIn);
//   const { form, isError, message } = useSelector((state) => state.form);

//   // console.log(`form :`, form);

//   useEffect(() => {
//     if (isLoggedIn === true) {
//       dispatch(getFormById(formId));
//     }

//     if (isError) {
//       console.log(message);
//     }
//     //eslint-disable-next-line
//   }, [isLoggedIn, isError, message, dispatch]);

//   return (
//     <div>
//       <h1 style={{ color: `${colors.grey[100]}` }}>Edit Form</h1>
//       <FormBuilder form={form} />
//     </div>
//   );
// };

// export default EditForm;
