import { Fragment } from 'react';
import uuid from 'react-uuid';
//Material UI Components
import {
  Grid,
  IconButton,
  Tooltip,
  Box,
  Paper,
  TextField,
  FormGroup,
  FormControlLabel,
  Switch,
  Divider,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Typography,
  useTheme,
} from '@mui/material';
//Icons
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { tokens } from '../../../theme';

//Form Elements
// import { formEl } from '../constants';
export const formEl = [
  {
    label: 'Options',
    value: 'radio',
  },
];
const RadioInput = ({
  item,
  handleValue,
  deleteEl,
  handleRequired,
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
    console.log(id, typeof id, 'this is id');
    const data = {
      id: uuid(),
      optionText: '',
    };
    addOption(id, data);
  };

  return (
    <Fragment>
      <Paper elevation={2} sx={{ backgroundColor: colors.primary[400] }}>
        {/* <Box sx={{ textAlign: 'center' }}>
          <DragIndicatorIcon
            sx={{
              transform: 'rotate(-90deg)',
              cursor: 'move',
              mt: -10,
            }}
          />
        </Box> */}
        <Box sx={{ p: 1, mt: 2 }}>
          <Grid container spacing={1}>
            <Grid item xs={8.5}>
              <TextField
                defaultValue={item.value}
                variant='filled'
                onBlur={(e) => handleValue(item.id, e)}
                fullWidth
                required={item.required}
                placeholder='Question'
                sx={{
                  mb: 2,
                  '& input': {
                    color: colors.grey[50],
                  },
                }}
                size='small'
                inputProps={{
                  style: { fontSize: 16, backgroundColor: colors.primary[500] },
                }}
              />
              {item.options &&
                item.options.length > 0 &&
                item.options.map((opt, key) => (
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
                        <p style={{ color: 'white', fontSize: '1rem' }}>
                          Delete Option
                        </p>
                      }
                      aria-label='delete-option'
                    >
                      <IconButton
                        aria-label='delete-option'
                        onClick={() => deleteOption(item.id, opt?.id)}
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
                onClick={() => createNewOption(item.id)}
              >
                Add Option
              </Button>
            </Grid>
            <Grid item xs={3.5}>
              <FormControl fullWidth>
                <InputLabel
                  id='el-type-label'
                  sx={{ fontSize: 14 }} // font size of input label
                >
                  Type
                </InputLabel>
                <Select
                  labelId='el-type-label'
                  id='el-type'
                  label='Type'
                  value={item.type}
                  sx={{ fontSize: 12 }}
                  size='medium'
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
        <FormGroup row sx={{ alignItems: 'center' }}>
          <Tooltip
            title={
              <p style={{ color: 'white', fontSize: '1rem' }}>Delete Element</p>
            }
            aria-label='delete-element'
          >
            <IconButton
              aria-label='delete-element'
              onClick={() => deleteEl(item.id)}
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
              <FileCopyIcon sx={{ fontSize: '1.5em' }} color='secondary' />
            </IconButton>
          </Tooltip>

          <FormControlLabel
            control={
              <Switch
                checked={item.required}
                onChange={() => handleRequired(item.id)}
                name='required-field'
                color='secondary'
              />
            }
            label={<Typography sx={{ fontSize: 15 }}>Required</Typography>}
            sx={{ ml: 2 }}
          />
        </FormGroup>
      </Paper>
    </Fragment>
  );
};

export default RadioInput;
