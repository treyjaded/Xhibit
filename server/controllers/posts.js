const Post = require("../models/Post.js");
const User = require("../models/User.js");
const knex = require("../knex.js");
const axios = require('axios');

/* CREATE */
const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;

    // Check if userId is not provided or is not a number
    if (typeof userId !== 'number' || isNaN(userId)) {
      return res.status(400).json({ message: 'Invalid userId' });
    }

    const user = await knex('users').where('id', userId).first();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newPost = {
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: JSON.stringify({}), // Use JSON.stringify for JSON columns
      comments: JSON.stringify([]), // Use JSON.stringify for JSON columns
    };

    await knex('posts').insert(newPost);

    const posts = await knex('posts');
    res.status(201).json(posts);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};



/* READ */
const getFeedPosts = async (req, res) => {
  try {
    const posts = await knex('posts');
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await knex('posts').where('userId', userId);
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


/* UPDATE */
const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await knex('posts').where('id', id).first();
    const likes = JSON.parse(post.likes); // Parse JSON column

    if (likes[userId]) {
      delete likes[userId];
    } else {
      likes[userId] = true;
    }

    await knex('posts')
      .where('id', id)
      .update({ likes: JSON.stringify(likes) }); // Stringify JSON

    const updatedPost = await knex('posts').where('id', id).first();
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};



async function testCreatePost() {
  try {
    // Prepare test data
    const testData = {
      userId: 'user1_id',
      firstName: 'John',
      lastName: 'Doe',
      location: 'New York, NY',
      description: 'Cool post!',
      userPicturePath: 'user1_picture.jpg',
      picturePath: 'post1_image.jpg',
      likes: JSON.stringify({ user1Id: 'user1_id', user2Id: 'user2' }),
      comments: JSON.stringify([
        "random comment",
        "another random comment",
        "yet another random comment",
      ])
    };

    // Send a POST request to the createPost endpoint
    const response = await axios.post('http://localhost:3000/posts', testData);

    // Check the HTTP response status code
    if (response.status === 201) {
      console.log('Post created successfully!');
      console.log('Response data:', response.data);
    } else {
      console.error('Failed to create a post. HTTP Status:', response.status);
      console.error('Response data:', response.data);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Call the test function
testCreatePost();


module.exports = {
  likePost,
  getUserPosts,
  getFeedPosts,
  createPost

}