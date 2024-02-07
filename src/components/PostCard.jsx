import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import { elapsedTime } from "../utility/elapsedTime";
import { truncatedStory } from "../utility/sanitizeHTML";
import { useNavigate } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa6";
import {motion} from 'framer-motion'
import './PostCard.css'
const maxLength=60

export const PostCard=({category,photoUrl,title,author,description,timestamp,id,likes})=> {
  const navigate=useNavigate()
  return (
    <Card sx={{ width: 300 }}>
      <div>
        <Typography level="title-lg">{title}</Typography>
        <Typography level="body-sm">{elapsedTime(timestamp)}</Typography>
        <IconButton
         
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
        >
           <p><FaThumbsUp/>{likes?.length}</p>
        </IconButton>
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img
          src={photoUrl}
          loading="lazy"
          alt={title}
        />
      </AspectRatio>
      <CardContent orientation="horizontal">
        <div>
          <Typography level="body-xs" sx={{color:"#f7797d"}}>{category}</Typography>
          <Typography >
          {truncatedStory(description,maxLength)}...
          </Typography>
        </div>
        <Button variant="solid"size="md"
         
          sx={{ ml: 'auto', alignSelf: 'end', fontWeight: 600,backgroundColor:"#fbd786" }}
          onClick={()=>navigate('detail/'+id)}
        >
         <motion.span  whileHover={{scale:1.1}}>több...</motion.span>
        </Button>
      </CardContent>
    </Card>
  );
}