import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const BasicSelect=({name,data,setSelectedValue})=> {
  const [selData, setSelData] = React.useState('');

  const handleChange = (event) => {
    setSelData(event.target.value);
    setSelectedValue(selData)
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{name}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selData}
          label={name}
          onChange={handleChange}
        >
            {data.map(obj=>
                  <MenuItem key={obj.name} value={obj.name}>{obj.name}</MenuItem>
            )}
    
        </Select>
      </FormControl>
    </Box>
  );
}