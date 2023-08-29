import React, { useState } from "react";
import "./styles/AddBlog.css";
const AddBlog = ({ setblog }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    media: null,
  });

  const handleChange = (event) => {
    const { name, value, type } = event.target;

    // Handle file input separately
    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: event.target.files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { title, description, media } = formData;
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    console.log(userDetails.userId);
    var formdata = new FormData();
    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("media", media);
    formdata.append("id", userDetails.userId);
    try {
      const response = await fetch("http://localhost:2000/api/blog/addBlog", {
        method: "POST",
        body: formdata,
      });
      if (response.ok) {
        console.log(response, 44);
        const responseData = await response.json();
        setblog(true);
      } else {
        const responseData = await response.json();

        window.alert(responseData.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }

    setFormData({
      title: "",
      description: "",
      media: null,
    });
  };

  return (
    <div className="add-blog-form">
      <h2>Add Blog Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="media">Upload Media:</label>
          <input
            type="file"
            id="media"
            name="media"
            accept="image/*, video/*"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddBlog;
