import React,{useState} from 'react'
import Stack from '@mui/material/Stack';
import { SingleChip } from './SingleChip';
import { useContext } from 'react';
import { CategContext } from '../context/CategContext';
import { Typography } from '@mui/material';

export const Categories = ({selectedCategories,setSelectedCategories}) => {
    const {categories}=useContext(CategContext)

  return (
    <Stack direction="row" spacing={1} 
       sx={{dispaly:'flex',flexWrap:'wrap',justifyContent:'center',padding:'5px',gap:'10px',marginTop:'2.4rem'}}>
      <Typography sx={{width:'100%',textAlign:'center',boxShadow:"0 5px 5px gray",padding:'5px',borderRadius:'5px'}}>
        Categories
      </Typography>
     {categories && categories.map(ctg=>
        <SingleChip key={ctg} ctg={ctg}
          selectedCategories={selectedCategories}   
          setSelectedCategories={setSelectedCategories} 
       
          />
      )}
  </Stack>
  )
}

