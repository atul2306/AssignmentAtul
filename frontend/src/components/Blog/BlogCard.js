import React, { useState } from "react";
import "./styles/Blogcard.css";
const BlogCard = ({
  title,
  media,
  description,
  userId,
  setDelete,
  postId,
  count,
  setcount,
  delete1,
  comments,
  setComments,
  setTitle,
  setDescription,
  id,
  postlike
  
}) => {
  
  const [newComment, setNewComment] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(title);
  const handleAddComment = async() => {
    if (newComment.trim() !== "") {
      const Data = {
        userid: userId,
        postid: postId,
        comment:newComment
      };
      try {
        const response = await fetch(
          "http://localhost:2000/api/blog/AddComment",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(Data),
          }
        );
        const responseData = await response.json();
        console.log(responseData,37);
        if (responseData.ok) {
          setComments(responseData.comments);
        } else {
          window.alert(responseData.message);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }

      setNewComment("");

    }
  };
  const deleteBlog = async () => {
    const Data = {
      userid: userId,
      postid: postId,
    };
    try {
      const response = await fetch(
        "http://localhost:2000/api/blog/deleteBlog",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Data),
        }
      );
      const responseData = await response.json();
      if (responseData.ok) {
        setDelete(true);
      } else {
        window.alert(responseData.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  
  const toggleEditTitle = () => {
    setIsEditingTitle(!isEditingTitle);
  };
  const toggleEditDescription = () => {
    setIsEditingDescription(!isEditingDescription);
  };
  const editTitle = async () => {
    try {
      const Data = {
        userid: userId,
        postid: postId,
        newTitle: newTitle,
      };
      const response = await fetch(
        "http://localhost:2000/api/blog/editBlogTitle",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Data),
        }
      );
      const responseData = await response.json();
      if (responseData.ok) {
        setIsEditingTitle(false);
        setTitle(newTitle); 
      } else {
        window.alert(responseData.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const editDescription = async () => {
    try {
      const Data = {
        userid: userId,
        postid: postId,
        newDescription: newDescription,
      };
      const response = await fetch(
        "http://localhost:2000/api/blog/editBlogDescription",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Data),
        }
      );
      const responseData = await response.json();
      if (responseData.ok) {
        setIsEditingDescription(false);
        setDescription(newDescription); 
      } else {
        window.alert(responseData.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  

  const likeBlog = async () => {
    const Data = {
      userid: userId,
      postid: postId,
    };
    try {
      const response = await fetch("http://localhost:2000/api/blog/AddLike", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Data),
      });
      const responseData = await response.json();
      if (responseData.ok) {
        setcount(responseData.post);
      } else {
        window.alert(responseData.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };



  return (
    <div className="card">
      <button
        style={{
          fontSize: "1.8rem",
          color: "white",
          padding: "10px",
          cursor: "pointer",
        }}
        onClick={deleteBlog}
      >
        Delete
      </button>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
  {isEditingTitle ? (
    <>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <button onClick={editTitle}>Save</button>
    </>
  ) : (
    <>
      <h3 className="card-title">{title}</h3>
      <button style={{ height: "50px" }} onClick={toggleEditTitle}>
        Edit Title
      </button>
    </>
  )}
</div>
     {media.endsWith(".mp4") ? (
        <video className="card-media" controls>
          <source src={media} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img className="card-media" src={media} alt="Blog Media" />
      )}
      {/* <img className="card-media" src={media} /> */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>

      {isEditingDescription ? (
    <>
      <input
        type="text"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <button onClick={editDescription}>Save</button>
    </>
  ) 
      :(
      <>
      <p className="card-description">{description}</p>
      <button style={{ height: "50px" }} onClick={toggleEditDescription}>
        Edit Description
      </button>

      </>
      )}
      </div>
      
      <button id={id} onClick={likeBlog}>LIKE {postlike}</button>
      <div className="comments-section">
      <h4>Comments</h4>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment.comment}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Add a comment"
        onChange={(e) => setNewComment(e.target.value)}
        value={newComment}
      />
      <button onClick={handleAddComment}>Add Comment</button>
    </div>
    </div>
  );
};

export default BlogCard;
