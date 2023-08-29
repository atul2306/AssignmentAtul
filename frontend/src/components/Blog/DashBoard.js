import React, { useEffect, useState } from "react";
import AddBlog from "./AddBlog";
import { NavLink } from "react-router-dom";
import BlogCard from "./BlogCard";

const DashBoard = () => {

   const [allPost, setAllPost]  =  useState([])
   const [delete1, setDelete] = useState(false)
  const [count,setcount] =useState([])
  const [blog,setblog] =useState(false)
  const [comments, setComments] = useState([]);
  const [titleold,setTitle] = useState()
  const [descriptionold,setDescription] = useState()
   
  const oLogout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    window.location.href = "/auth/signin";
  }
    const getAllBlog = async()=>{
      try {
        const response = await fetch('http://localhost:2000/api/blog/getAllBlog');
        const responseData = await response.json()
        if (responseData.ok) {
                setAllPost(responseData.blog)
                
        } else {
  
  
            window.alert(responseData.message)
  
        }
      } catch (error) {
        console.error('An error occurred:', error);
  
      }
    }
    useEffect(()=>{
       getAllBlog()
    },[delete1,blog,count,comments,titleold,descriptionold])
    
    
  return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}} >
      <button onClick={oLogout} >Logout</button>

          <AddBlog setblog={setblog}/>
       {
        allPost.map((post,id)=>{
            return (
              <BlogCard key={id} id={id} title={post?.caption} media={post?.image?.url} description={post?.description} postlike= {post.likes.length} userId={post.owner} postId={post._id} setDelete={setDelete} count={count} setcount={setcount} delete1={delete1} setComments={setComments} comments={comments} setTitle={setTitle} setDescription={setDescription} />
            )
        })
       }
     
    </div>
  );
};

export default DashBoard;
