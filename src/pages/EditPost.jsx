import React from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { NotFound } from "./NotFound";
import { useState } from "react";
import { Loader } from "../components/Loader";
import { uploadFile } from "../utility/uploadFile";
import { addPost, editPost, readPost } from "../utility/crudUtility";
import { MyAlert } from "../components/MyAlert";
import { CategContext } from "../context/CategContext";
import { TextEditor } from "../components/TextEditor";
import {  Box,  Button,  FormControl,  InputLabel,  MenuItem,  Select,  TextField,} from "@mui/material";
import { FileInput } from "../components/FileInput";
import { Alerts } from "../components/Alerts";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


export const EditPost = () => {
  const { user } = useContext(UserContext);
  const { categories } = useContext(CategContext);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [story, setStory] = useState("");
  const [category,setCategory]=useState(0)
  const [title,setTitle]=useState('')
  const param = useParams();
  const [newStory, setNewStory] = useState(null);

  const [post, setPost] = useState(null); //editálás esetén jelenítsük meg az adatokat

  useEffect(() => {
    if (param?.id) readPost(param.id, setPost);
  }, [param?.id]);

  useEffect(() => {

    if (post && param?.id) {
      setTitle( post.title);
      setStory(post.description)
      setCategory( post.category);
      setImage(post.photoUrl);
    }
  }, [post,param?.id]);

  //console.log(post);
console.log(story);

  if (!user) return <NotFound />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      
      await editPost(param.id,{
        title,
        category,
        description: newStory? newStory : story,
        });
      setUploaded(true);
    } catch (error) {
      console.log("Hiba a feltöltés során!");
    } finally {
      setLoading(false);
      //console.log('sikeres feltöltés');
    }

    e.target.reset();
  };

  return (
    <div className="createBlog">
      <h3>Create post</h3>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Box  sx={{display:'flex',flexWrap:'wrap',justifyContent:'start',gap:2,alignItems:'center'}}>
          <TextField margin="normal"   required  autoFocus  label="Post Title" variant="outlined"
            value={title} 
            onChange={(e)=>setTitle(e.target.value)}  />
          <FormControl >
            <InputLabel id="category">Category</InputLabel>
            <Select labelId="category" value={category}  label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="0">select category...</MenuItem>
              {categories &&
                categories.map((ctg) => (
                  <MenuItem key={ctg} value={ctg}>
                    {ctg}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
      </Box>
        <FormControl>
          <TextEditor story={story} setStory={setStory} setNewStory={setNewStory} type='edit'/>
        </FormControl>

        {image && (
        <Box mt={2} textAlign="center">
            <img src={image} alt={title} height="100px" />
        </Box>
      )}

        <Button type="submit" variant="contained" color="primary" 
          disabled={!title || title?.length==0 || story?.length==0 || category==0 || !image}
        >
         Save post
        </Button>
      </Box>
      {loading && <Loader />}
      {uploaded && <Alerts text="Sikeres mentés!" severity="success"/>}
    </div>
  );
};
