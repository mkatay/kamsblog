import React,{useState} from 'react'
import { Categories } from '../components/Categories'
import { Posts } from '../components/Posts'
import './MyBlog.css'
import { PopularPosts } from '../components/PopularPosts'

export const MyBlog = () => {
  const [selectedCategories,setSelectedCategories] =useState([])
  return (
    <div className='home'>
      <div className="categ">
         <Categories  selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>
         <PopularPostsMemoized />
      </div>
      <div className="posts">
        <Posts selectedCategories={selectedCategories}/>
      </div>
      
    </div>
  )
}
//memoizáljuk:
const PopularPostsMemoized=React.memo(PopularPosts)