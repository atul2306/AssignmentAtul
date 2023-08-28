import React from 'react'

const Blog = () => {

    const Addonclick = (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);
        console.log(e.target,8);
        console.log(formdata,9);
        formdata.append("id", "64ec74df3fafaafcaccdad38" );
        console.log(formdata,11);
        
        //sendRequest("http://localhost:9000/api/v1/post/upload", "POST", formdata)
        // sendRequest(
        //   process.env.REACT_APP_APIURL + "/api/v1/post/upload",
        //   "POST",
        //   formdata
        // )
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formdata)
        };
        fetch('http://localhost:6000/api/blog/addBlog', requestOptions)
          .then((res) => {
            if (res.success) {
            } else {
            }
          })
          .catch((err) => {
            console.log(err);
           
          });
      };

  return (
    <div>
       <form onSubmit={Addonclick}>
            <input
              
              type="text"
              placeholder="Caption"
              name="caption"
            />

            <input  type="file" name="image" />
            <div style={{ display: "flex" }}>
            
              <button >
                <span style={{ color: "white" }}>Add </span>
              </button>
            </div>
          </form>
    </div>
  )
}

export default Blog
