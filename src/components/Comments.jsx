import React from 'react'
import {Paper,Grid,Avatar,Divider,Button} from '@mui/material'
import Textarea from '@mui/joy/Textarea';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useState } from 'react';
import { addComment, readComments } from '../utility/crudUtility';
import { useEffect } from 'react';
import { elapsedTime } from '../utility/elapsedTime';

export const Comments = ({id}) => {
    const {user}=useContext(UserContext)
    const [newComment,setNewComment]=useState('')
    const [comments,setComments]=useState(null)
    useEffect(()=>{
        readComments(id,setComments)
    },[])

    const handleAddComment=async ()=>{
        await addComment(id,user.email,user.displayName,newComment)
        setNewComment('')
    }
    console.log(user);
  return (
    <div style={{ padding: 5,maxWidth:'400px' }} >
      <h6>Comments</h6>
      
      <Paper sx={{ padding: comments?.length>0 ? "20px 10px":"0" ,marginBottom:'5px'}}>
        {comments && comments.map(obj=>
        <>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt={obj.userName} src={''} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>{obj.userName}</h4>
            <p style={{ textAlign: "left" }}>
             {obj.comment}
            </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              {obj?.timestamp &&  elapsedTime(obj.timestamp)}
            </p>
          </Grid>
        </Grid>
        <Divider variant="fullWidth" style={{ margin: "10px 0" }} />
        </>)
}
       
      </Paper>

    {user && 
    <>
        <Textarea minRows={3} placeholder="add a comment" value={newComment} onChange={(e)=>setNewComment(e.target.value)}/>
          <Button type="submit" variant="contained" color="primary" sx={{margin:1}}
          disabled={newComment.length==0 }
          onClick={handleAddComment}
        >
          save
        </Button>
        </>
    }
     
     
     
    </div>
  )
}
