import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { deleteFile, deletePost, editLikes, readPost } from '../utility/crudUtility'
import parse from 'html-react-parser'
import {FaPen, FaThumbsUp, FaTrash} from 'react-icons/fa6'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { useConfirm } from "material-ui-confirm";
import { MyAlert } from '../components/MyAlert'
import './Detail.css'
import { Comments } from '../components/Comments'

export const Detail = () => {
  const {user}=useContext(UserContext)
  const navigate=useNavigate()
  const [post,setPost]=useState(null)
  const [msg,setMsg]=useState('')
  const [likes,setLikes]=useState(null)
  const params=useParams()
  const confirm=useConfirm()
  //console.log(params.id);

  useEffect(()=>{
    readPost(params.id,setPost,setLikes)
  },[])

  const handleDelete=async ()=>{
    try{
        await confirm({
          description:'Ez egy visszavonhatatlan művelet!',
          confirmationText:'igen',
          cancellationText:'mégsem',
          title:'Biztosan ki szeretnéd törölni?'
        })
        console.log('igen');
        const result=await deleteFile(post.photoUrl)
        if(result){
          deletePost(post.id)
          navigate('/')
        }else
          console.log('nem sikerült a törlés....');
    }catch(str){
      console.log('mégsem...');
    }
  }

const handleLikes=async ()=>{
  if(user){
    //console.log(user.uid,params.id);
    const likeCount=await editLikes(params.id,user.uid)
    console.log(`A likeok száma: ${likeCount}`);
    setLikes(likeCount)
  }else{
    console.log('Nem vagy bejelentkezve!');
    setMsg('Bejelentkezés szükséges!')
  }
}
  //console.log(post);
  return (
    <div className='container p-1 singlePost'>
      <div className="d-flex flex-wrap justify-content-center">
      <div className="d-flex flex-column align-items-center image-container flex-grow-1 post-details">

         {post && <img src={post?.photoUrl} alt={post?.title} className='image'/>}
    
     
      <h3 className='text-center m-2'>{post?.title}</h3>
     
      <div className="d-flex justify-content-between  text-secondary">
         <span className="singlePostAuthor">{post?.author}</span>
      
       </div>
       {post && <p className="post-text align-self-start" >{parse(post.description)}</p>}
      <div className="d-flex justify-content-between w-100">
        <div className='d-flex gap-2 align-items-center'>
          <FaThumbsUp className='text-primary  icon' onClick={handleLikes}/>
          <span>{likes}</span>
        </div>
        {(user && post && user.uid==post.userId)   &&
          <div>
            <FaTrash className='text-danger  icon' onClick={handleDelete}/>
            <FaPen className='text-warning  icon'   onClick={()=>navigate('/update/'+post.id)}/>
          </div>
        }
       </div>
       {msg && <MyAlert text={msg}/>}  
       <div className="d-flex justify-content-center">
          <button  className='btn btn-light ' onClick={()=>navigate('/')}>vissza...</button>    
        </div> 
         </div>
        <Comments id={params.id}/>
        
      </div>  
 </div>
  )
}

