import React from 'react';
import {
  Box,
  Button,
  Divider,
  FormGroup,
  Grid,
  IconButton,
  Paper,
  TextField,
  Tooltip,
} from '@mui/material';
// import uuid from 'react-uuid';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { useTheme } from '@mui/system';
import { tokens } from '../../theme';

const ExistingQues = ({
  questions,
  item,
  handleValue,
  deleteEl,
  addOption,
  handleOptionValues,
  deleteOption,
  duplicateElement,
}) => {
  const createNewOption = (id) => {
    console.log(id, typeof id, 'this is id');
    const data = {
      id: id,
      optionText: '',
    };
    addOption(id, data);
  };

  // const deleteOption = (elId, optionId) => {
  //   let newArr = questions.map((el) => {
  //     if (el.id === elId) {
  //       let newOptions =
  //         el?.options && el?.options.filter((opt) => opt.id !== optionId);
  //       return { ...el, options: newOptions };
  //     } else {
  //       return el;
  //     }
  //   });
  //   setData(newArr);
  // };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // console.log('questions: ', questions);

  return (
    <>
      {questions &&
        questions.length > 0 &&
        questions.map((ques, index) => {
          const { _id, questionText, options } = ques;
          return (
            <Paper
              key={_id}
              elevation={2}
              sx={{ backgroundColor: colors.primary[400] }}
            >
              <Box sx={{ p: 1, mt: 2 }}>
                <Grid container spacing={1}>
                  <Grid item xs={8.5}>
                    <TextField
                      defaultValue={questionText}
                      variant='filled'
                      onBlur={(e) => handleValue(_id, e)}
                      fullWidth
                      // required={item.required}
                      placeholder='Questionasdasd'
                      sx={{
                        mb: 2,
                        '& input': {
                          color: colors.grey[50],
                        },
                      }}
                      size='small'
                      inputProps={{
                        style: {
                          fontSize: 16,
                          backgroundColor: colors.primary[500],
                        },
                      }}
                    />
                    {options &&
                      options.length > 0 &&
                      options.map((opt, key) => (
                        <Box key={key} sx={{ display: 'flex' }}>
                          <TextField
                            variant='outlined'
                            fullWidth
                            placeholder={`Option ${key + 1}`}
                            defaultValue={opt?.optionText}
                            key={opt?.id}
                            sx={{
                              mb: 1,
                              '& input': {
                                color: colors.grey[50],
                              },
                            }}
                            onBlur={(e) =>
                              handleOptionValues(
                                item?.id,
                                opt?.id,
                                e.target.value
                              )
                            }
                            inputProps={{
                              style: {
                                fontSize: 16,
                                backgroundColor: colors.primary[500],
                              },
                            }}
                          />
                          <Tooltip
                            title={
                              <p style={{ color: 'white', fontSize: '1rem' }}>
                                Delete Option
                              </p>
                            }
                            aria-label='delete-option'
                          >
                            <IconButton
                              aria-label='delete-option'
                              onClick={() => deleteOption(_id, opt?.id)}
                              sx={{ ml: 2 }}
                            >
                              <DeleteIcon
                                sx={{ fontSize: '2em' }}
                                color='secondary'
                              />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      ))}
                    <Button
                      variant='text'
                      sx={{ fontSize: '1.2rem', color: colors.grey[100] }}
                      onClick={() => createNewOption(_id)}
                    >
                      Add Option
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              <Divider light />
              <FormGroup row sx={{ alignItems: 'center' }}>
                <Tooltip
                  title={
                    <p style={{ color: 'white', fontSize: '1rem' }}>
                      Delete Element
                    </p>
                  }
                  aria-label='delete-element'
                >
                  <IconButton
                    aria-label='delete-element'
                    onClick={() => deleteEl(ques?.id)}
                    sx={{ ml: 2 }}
                  >
                    <DeleteIcon sx={{ fontSize: '2em' }} color='secondary' />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title={
                    <p style={{ color: 'white', fontSize: '1rem' }}>
                      Duplicate Element
                    </p>
                  }
                  aria-label='duplicate-element'
                >
                  <IconButton
                    aria-label='duplicate-element'
                    onClick={() => duplicateElement(item.id, item.type)}
                    sx={{ ml: 2 }}
                  >
                    <FileCopyIcon
                      sx={{ fontSize: '1.5em' }}
                      color='secondary'
                    />
                  </IconButton>
                </Tooltip>
              </FormGroup>
            </Paper>
          );
        })}
    </>
  );
};

export default ExistingQues;
