import React, { useState } from 'react';
import { useEffect } from 'react';
import { Alert } from 'reactstrap';

export const MyAlert=({msg,setMsg})=> {
  const [visible, setVisible] = useState(true);

console.log('visible:',visible);
  const onDismiss = () =>{
    setVisible(false);
    setMsg(null)
  } 

  return (
    <Alert color="info" isOpen={visible} toggle={onDismiss}>
      {msg}
    </Alert>
  );
}

