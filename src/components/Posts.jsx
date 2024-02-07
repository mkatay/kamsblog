import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { readPosts } from "../utility/crudUtility";
import { PostCard } from "./PostCard";
import {motion} from 'framer-motion'

export const Posts = ({ selectedCategories }) => {
  const [posts, setPosts] = useState([]);
  console.log(selectedCategories);

  useEffect(() => {
    readPosts(setPosts, selectedCategories);
  }, [selectedCategories]);

  console.log(posts);
  return (
    <div className="">
      <motion.h4 initial={{x:'100vw'}} animate={{x:0}} transition={{type:'spring',delay:0.5,stiffness:10}}>Awesome collection</motion.h4>
      <hr />
      <div className="cards-holder" style={{display:'flex',flexWrap:'wrap',gap:10,justifyContent:'center'}}>
        {posts.map((obj) => (
          <PostCard key={obj.id} {...obj} />
        ))}
      </div>
    </div>
  );
};
 