import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function Dropdown() {
  const [gender, setGender] = React.useState("");

  console.log(gender)

  const handleChange = (event: SelectChangeEvent) => {
    setGender(String(event.target.value));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={String(gender)}
          label="Gender"
          onChange={handleChange}
        >
          <MenuItem value={'M'}>Male</MenuItem>
          <MenuItem value={'F'}>Female</MenuItem>
          <MenuItem value={'L'}>LGTV</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default Dropdown;