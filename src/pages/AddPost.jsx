import React from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { NotFound } from "./NotFound";
import { useState } from "react";
import { Loader } from "../components/Loader";
import { uploadFile } from "../utility/uploadFile";
import { addPost } from "../utility/crudUtility";
import { MyAlert } from "../components/MyAlert";
import { CategContext } from "../context/CategContext";
import { TextEditor } from "../components/TextEditor";
import {  Box,  Button,  FormControl,  InputLabel,  MenuItem,  Select,  TextField,} from "@mui/material";
import { FileInput } from "../components/FileInput";
import { Alerts } from "../components/Alerts";
import { useEffect } from "react";

export const AddPost = () => {
  const { user } = useContext(UserContext);
  const { categories } = useContext(CategContext);
  
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [story, setStory] = useState("");
  const [category,setCategory]=useState(0)
  const [title,setTitle]=useState('')

  useEffect(()=>{
    if(uploaded)
      document.querySelector('form').reset()
  },[uploaded])

  if (!user) return <NotFound />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const photoUrl = await uploadFile(image);
      //console.log("a feltöltött fájl URLje:", photoUrl);
      await addPost({
        title,
        category,
        photoUrl,
        author: user.displayName,
        userId: user.uid,
        description: story,
        likes: [],
        likesCount: 0,
      });
      setUploaded(true);
      e.target.reset();
    } catch (error) {
      console.log("Hiba a fájlfeltöltés során!");
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
          <TextEditor story={story} setStory={setStory} type='create'/>
        </FormControl>

        <FileInput setImage={setImage} />

        <Button type="submit" variant="contained" color="primary" 
          disabled={title.length==0 || story.length==0 || category==0 || !image}
        >
          Upload post
        </Button>
      </Box>
      {loading && <Loader />}
      {uploaded && <Alerts text="Sikeres mentés!" severity="success"/>}
    </div>
  );
};
