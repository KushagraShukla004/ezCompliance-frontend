import { Fragment } from "react";
import uuid from "react-uuid";
//Material UI Components
import {
  Grid,
  IconButton,
  Tooltip,
  Box,
  Paper,
  TextField,
  FormGroup,
  Divider,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  useTheme,
} from "@mui/material";
//Icons
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { tokens } from "../../../theme";
export const formEl = [
  {
    label: "Options",
    value: "radio",
  },
];
const RadioInput = ({
  item,
  handleValue,
  deleteEl,
  handleElType,
  addOption,
  handleOptionValues,
  deleteOption,
  duplicateElement,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //Create new option
  const createNewOption = (id) => {
    const data = {
      id: uuid(),
      optionText: "",
    };
    addOption(id, data);
  };

  return (
    <Fragment>
      <Paper elevation={2} sx={{ backgroundColor: colors.primary[400] }}>
        <Box sx={{ p: 1, mt: 2 }}>
          <Grid container spacing={1}>
            <Grid item xs={8.5}>
              <TextField
                defaultValue={item.value}
                variant="filled"
                onBlur={(e) => handleValue(item.id, e)}
                fullWidth
                placeholder="Question"
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
              {item.options &&
                item.options.length > 0 &&
                item.options.map((opt, key) => (
                  <Box key={key} sx={{ display: "flex" }}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder={`Option ${key + 1}`}
                      defaultValue={opt?.optionText}
                      key={opt?.id}
                      sx={{
                        mb: 1,
                        "& input": {
                          color: colors.grey[50],
                        },
                      }}
                      onBlur={(e) =>
                        handleOptionValues(item?.id, opt?.id, e.target.value)
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
                        onClick={() => deleteOption(item.id, opt?.id)}
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
                onClick={() => createNewOption(item.id)}
              >
                Add Option
              </Button>
            </Grid>
            <Grid item xs={3.5}>
              <FormControl fullWidth>
                <InputLabel
                  id="el-type-label"
                  sx={{
                    color: `${colors.grey[100]}`,
                    "&.Mui-focused": {
                      color: `${colors.grey[100]}`,
                    },
                  }} // font size of input label
                >
                  Type
                </InputLabel>
                <Select
                  labelId="el-type-label"
                  id="el-type"
                  label="Type"
                  value={item.type}
                  sx={{
                    fontSize: 12,
                    ".MuiOutlinedInput-notchedOutline": {
                      fontSize: 19,
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
                  onChange={(e) => handleElType(item.id, e.target.value)}
                >
                  {formEl &&
                    formEl.map((el, key) => (
                      <MenuItem
                        sx={{ fontSize: 14.5 }}
                        key={key}
                        value={el.value}
                      >
                        {el.label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <Divider light />
        <FormGroup row sx={{ alignItems: "center" }}>
          <Tooltip
            title={
              <p style={{ color: "white", fontSize: "1rem" }}>Delete Element</p>
            }
            aria-label="delete-element"
          >
            <IconButton
              aria-label="delete-element"
              onClick={() => deleteEl(item.id)}
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
              onClick={() => duplicateElement(item.id, item.type)}
              sx={{ ml: 2 }}
            >
              <FileCopyIcon sx={{ fontSize: "1.5em" }} color="secondary" />
            </IconButton>
          </Tooltip>
        </FormGroup>
      </Paper>
    </Fragment>
  );
};

export default RadioInput;
