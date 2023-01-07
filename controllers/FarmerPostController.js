const fs = require('fs');   

const data = {
    posts: require('../models/FarmerPostModel.json'),
    setPosts: function (data) { this.posts = data }
}

// REST API function to get all posts
const getAllPosts = (req, res) => {
    res.json(data.posts)
}

// REST API function to create a post
const createPost = (req, res) => {
    const newPost = {
        id: data.posts?.length ? data.posts[data.posts.length - 1].id + 1 : 1,
        postName: req.body.postName,
        description: req.body.description,
        quantity: req.body.quantity
    }

    if (!newPost.postName || !newPost.description || !newPost.quantity) {
        return res.status(400).json({ 'message': 'Post Name, Description and Quantity are required.' });
    }

    data.setPosts([...data.posts, newPost]);
    res.status(201).json(data.posts);
}

module.exports = {
    getAllPosts,
    createPost
}