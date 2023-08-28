const Blog = require("../model/BlogPost");
const User = require("../model/User");
const Cloudinary = require("../Config/Cloudinary");

module.exports.blog_add_controller = async (req, res) => {
  try {
    const { id, title, description } = req.body;
    const { path } = req.file;
    const image = await Cloudinary.uploader.upload(path, {
      folder: "BLOG",
      use_filename: true,
    });
    const user = await User.findById(id);

    const newPost = {
      caption: title,
      image: {
        public_id: image.public_id,
        url: image.url,
      },
      owner: id,
    };

    const postCreate = await Post.create(newPost);

    user.posts.push(postCreate._id);

    await user.save();

    res.status(201).json({
      success: true,
      message: "Post Created",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.Updateblogtitle = async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
      const id = req.params.id;
    if (user.posts.includes(id)) {
      const post = await Blog.findById(id);
      post.caption = req.body.title;
      await post.save();
      return res.status(200).json({
        success: true,
        message: "Title Updated",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "you cant Update",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.UpdateblogDescription = async (req, res) => {
    try {
      const user = await User.findById(req.body.id);
        const id = req.params.id;
      if (user.posts.includes(id)) {
        const post = await Blog.findById(id);
        post.description = req.body.description;
        await post.save();
        return res.status(200).json({
          success: true,
          message: "description Updated",
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "you cant Update",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };


//   module.exports.UpdatePhotoDescription = async (req, res) => {
//     try {
//       const user = await User.findById(req.body.id);
//         const id = req.params.id;
//       if (user.posts.includes(id)) {
//         const post = await Blog.findById(id);
//         post.description = req.body.description;
//         await post.save();
//         return res.status(200).json({
//           success: true,
//           message: "description Updated",
//         });
//       } else {
//         return res.status(400).json({
//           success: false,
//           message: "you cant Update",
//         });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };


module.exports.DeleteBlog = async (req, res) => {
    try {
      const query = req.params.query;
      const arr = query.split(",");
      const postid = arr[0];
      const userid = arr[1];
      //  console.log(postid,userid)
      const post = await Blog.findById(postid);
      // console.log(post)
      if (!post) {
        return res.status(400).json({
          success: false,
          message: "Post Not Found",
        });
      }
      // const user= await User.findById(post.owner);
      // console.log(post.owner)
      // console.log(userid)
      //  console.log(post.owner!= userid)
      if (post.owner != userid) {
        return res.status(400).json({
          success: false,
          message: "Unauthorised",
        });
      }
      await post.remove(); // post deleted from the model
  
      const user = await User.findById(userid);
  
      const index = user.posts?.indexOf(postid);
  
      if (index) {
        user.posts?.splice(index, 1);
        await user.save();
        return res.status(202).json({
          success: true,
          message: "POST DELETED",
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "some error Found",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  module.exports.likeAndUnlikeBlog = async (req, res) => {
    try {
      const query = req.params.query;
      const arr = query.split(",");
      const postid = arr[0];
      const userid = arr[1];
  
      const post = await Blog.findById(postid);
      if (!post) {
        return res.status(400).json({
          success: false,
          message: "Post Not Found",
        });
      }
      if (post.likes.includes(userid)) {
        const index = post.likes.indexOf(userid);
        post.likes.splice(index, 1);
        await post.save();
        return res.status(200).json({
          success: true,
          post: post.likes,
          message: "POST DISLIKED",
        });
      } else {
        post.likes.push(userid);
        await post.save();
        return res.status(200).json({
          success: true,
          post: post.likes,
          message: "POST LIKED",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };


  module.exports.commentsOnBlog = async (req, res, next) => {
    try {
      const { postid, userid, comment } = req.body;
      if (!postid || !userid || !comment) {
        return res.status(400).json({
          success: false,
          message: "Enter comment",
        });
      }
      const post = await Blog.findById(postid);
      if (!post) {
        return res.status(400).json({
          success: false,
          message: "post not found",
        });
      }
      const commentindex = post?.comments?.user?.indexOf(userid);
      if (commentindex >= 0) {
        post.comments[commentindex].comment = comment;
        await post.save();
      } 
      else {
        post.comments.push({
          user: userid,
          comment: comment,
        });
        await post.save();
      }
  
      return res.status(200).json({
        success: true,
        message: "comment added",
      });
    } catch (err) {
      console.log(err);
    }
  };