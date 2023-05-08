import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllForms } from '../../redux/features/form/formSlice';
import { tokens } from '../../theme';
import AllForms from '../allForms/AllForms';

const FormCategory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);

  const [category, setCategory] = useState('');

  const categoryEl = [
    {
      label: `${data?.category}`,
    },
  ];

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
  return (
    <section>
      <Grid
        container
        spacing={1}
        mb={2}
        direction='row'
        justifyContent='center'
      >
        <FormControl sx={{ width: '50%' }}>
          <InputLabel
            id='el-category-label'
            sx={{
              color: `${colors.grey[100]}`,
              '&.Mui-focused': {
                color: `${colors.grey[100]}`,
              },
            }} // font size of input label
          >
            Category
          </InputLabel>
          <Select
            labelId='el-category-label'
            id='el-category'
            label='Category'
            sx={{
              fontSize: 12,
              '.MuiOutlinedInput-notchedOutline': {
                fontSize: 19,
                borderColor: `${colors.grey[100]}`,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: `${colors.grey[100]}`,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: `${colors.grey[100]}`,
              },
              '.MuiSvgIcon-root ': {
                fill: `${colors.grey[100]} !important`,
              },
            }}
            size='medium'
            onChange={(e) => handleElType(e.target.value)}
          >
            {categoryEl &&
              categoryEl.map((el, key) => (
                <MenuItem sx={{ fontSize: 14.5 }} key={key} value={el.value}>
                  {el.label}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      <AllForms />
    </section>
  );
};

export default FormCategory;
