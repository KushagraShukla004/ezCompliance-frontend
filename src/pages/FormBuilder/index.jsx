import { Fragment, useState } from 'react';
import uuid from 'react-uuid';
import Nestable from 'react-nestable';
import { useNavigate } from 'react-router-dom';
//Material UI Components
import { Grid, IconButton, Tooltip, Button, Box } from '@mui/material';
//Icons
import { MdAddCircle } from 'react-icons/md';
//Form Elements
import { RadioInput } from './elements';
// import Layout from './elements/layout';
// import { formEl } from './constants.js';
//Components
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import {
  createForm,
  selectIsLoading,
} from '../../redux/features/form/formSlice';
import { useEffect } from 'react';
import { SpinnerImg } from '../../components/loader/Loader';
import { selectUser } from '../../redux/features/auth/authSlice';

export const formEl = [
  {
    label: 'Options',
    value: 'radio',
  },
];
// const initialState = {
//   userId: null,
//   name: '',
//   email: '',
//   role: '',
// };

const FormBuilder = () => {
  const initVal = formEl[0]?.value;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(selectIsLoading);
  const user = useSelector(selectUser);
  // console.log('user: ', user);

  //State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [data, setData] = useState([]);
  const [option, setOption] = useState('radio');
  const [optionText, setOptionText] = useState('');
  // const [FormCreatedByData, setFormCreatedByData] = useState(initialState);

  // console.log('FormCreatedByData: ', FormCreatedByData);
  const items = data;

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

  //Function to Handle Required
  const handleRequired = (id) => {
    let newArr = data.map((el) => {
      if (el.id === id) {
        return { ...el, required: !el.required };
      } else {
        return el;
      }
    });
    setData(newArr);
  };

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

  // useEffect(() => {
  //   setFormCreatedByData({
  //     userId: user?._id,
  //     name: user?.name,
  //     email: user?.email,
  //     role: user?.role,
  //   });
  // }, [user]);

  //Function to append values to the backend
  const saveForm = () => {
    // setFormCreatedByData({
    //   userId: user?._id,
    //   name: user?.name,
    //   email: user?.email,
    //   role: user?.role,
    // });
    dispatch(
      createForm({
        // createdBy: FormCreatedByData,
        createdBy: {
          userId: user?._id,
          name: user?.name,
          email: user?.email,
          role: user?.role,
        },
        title: title,
        description: description,
        questions: data,
      })
    );

    navigate('/forms');
  };

  //Render items
  const renderElements = ({ item }) => {
    switch (item.type) {
      case 'radio':
        return (
          <RadioInput
            item={item}
            handleValue={handleValue}
            deleteEl={deleteEl}
            handleRequired={handleRequired}
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
        <Grid
          container
          spacing={1}
          direction='row'
          justifyContent='center'
          sx={{ fontSize: '4em' }}
        >
          <Grid item md={10} lg={4.5} sx={{ ml: 7 }}>
            <Header
              title={data.title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
            />
            <Nestable
              items={items}
              renderItem={renderElements}
              maxDepth={1}
              onChange={handleOnChangeSort}
            />
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
                <MdAddCircle size={35} color='#142cac' />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <Box
          sx={{
            mt: 2,
            mr: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            aria-label='createForm'
            // onClick={() => duplicateElement(item.id, item.type)}
            variant='contained'
            onClick={saveForm}
          >
            Save
          </Button>
        </Box>
      </section>
    </Fragment>
  );
};
export default FormBuilder;
