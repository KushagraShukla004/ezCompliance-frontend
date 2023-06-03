import React from "react";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { useTheme } from "@mui/system";
import { tokens } from "../../theme";
import uuid from "react-uuid";

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
  const createNewOptInExistingQues = (id) => {
    const data = {
      id: uuid(),
      optionText: "",
    };
    addOption(id, data);
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      {questions &&
        questions.length > 0 &&
        questions.map((ques, index) => {
          const { _id, id, questionText, options } = ques;

          return (
            <Paper
              key={index}
              elevation={2}
              sx={{ backgroundColor: colors.primary[400] }}
            >
              <Box sx={{ p: 1, mt: 2 }}>
                <Grid container spacing={1}>
                  <Grid item xs={8.5}>
                    <TextField
                      defaultValue={questionText}
                      variant="filled"
                      onBlur={(e) => handleValue(_id || id, e)}
                      fullWidth
                      placeholder="Questions in Existing Ques"
                      sx={{
                        mb: 2,
                        "& input": {
                          color: colors.grey[50],
                        },
                      }}
                      size="small"
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
                        <Box key={key} sx={{ display: "flex" }}>
                          <TextField
                            variant="outlined"
                            fullWidth
                            placeholder={`Option ${key + 1}`}
                            defaultValue={opt?.optionText}
                            key={opt?._id || opt?.id}
                            sx={{
                              mb: 1,
                              "& input": {
                                color: colors.grey[50],
                              },
                            }}
                            onBlur={(e) =>
                              handleOptionValues(
                                _id,
                                opt._id || opt.id,
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
                              <p style={{ color: "white", fontSize: "1rem" }}>
                                Delete Option
                              </p>
                            }
                            aria-label="delete-option"
                          >
                            <IconButton
                              aria-label="delete-option"
                              onClick={() => deleteOption(_id, opt._id)}
                              sx={{ ml: 2 }}
                            >
                              <DeleteIcon
                                sx={{ fontSize: "2em" }}
                                color="secondary"
                              />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      ))}
                    <Button
                      variant="text"
                      sx={{ fontSize: "1.2rem", color: colors.grey[100] }}
                      onClick={() => createNewOptInExistingQues(_id || id)}
                    >
                      Add Option
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              <Divider light />
              <FormGroup row sx={{ alignItems: "center" }}>
                <Tooltip
                  title={
                    <p style={{ color: "white", fontSize: "1rem" }}>
                      Delete Element
                    </p>
                  }
                  aria-label="delete-element"
                >
                  <IconButton
                    aria-label="delete-element"
                    onClick={() => deleteEl(_id || id)}
                    sx={{ ml: 2 }}
                  >
                    <DeleteIcon sx={{ fontSize: "2em" }} color="secondary" />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title={
                    <p style={{ color: "white", fontSize: "1rem" }}>
                      Duplicate Element
                    </p>
                  }
                  aria-label="duplicate-element"
                >
                  <IconButton
                    aria-label="duplicate-element"
                    onClick={() => duplicateElement(item._id)}
                    sx={{ ml: 2 }}
                  >
                    <FileCopyIcon
                      sx={{ fontSize: "1.5em" }}
                      color="secondary"
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
