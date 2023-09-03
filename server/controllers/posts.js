import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// export const deletePost = async (req, res) => {
//   try {
//     const { id } = req.params; // Assuming id is passed as a route parameter
//     const post = await Post.findById(id);

//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     // Check if the user has the permission to delete this post
//     // This can depend on your application's logic and authentication/authorization system

//     // Delete the post
//     await post.remove();

//     // Optionally, you can return a success message or updated list of posts
//     const updatedPosts = await Post.find();
//     res.status(200).json(updatedPosts);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
/* DELETE */
export const deletePost = async (req, res)=>{
  try {
    const {id} = req.params;
    const {loggedInUserId, postUserId} = req.body;
    // console.log(">>>>>",loggedInUserId, postUserId)
    if(loggedInUserId !== postUserId) return res.status(401).json({message:"unauthorized action"});
    const deleted = await Post.findByIdAndDelete(id);
    const posts = await Post.find();
    res.status(200).json(posts)
  } catch (err) {
    res.status(404).json({message:err.message})
  }
}