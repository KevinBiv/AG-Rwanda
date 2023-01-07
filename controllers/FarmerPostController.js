const fs = require('fs');
// const postIDFromViews = require('../views');

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

// REST API function to update a post
const updatePost = (req, res) => {
    const post = data.posts.find(p => p.id === parseInt(req.body.id));
    if (!post) {
        return res.status(400).json({ "message": `Post ID ${req.body.id} not found` });
    }
    if (req.body.postName) post.postName = req.body.postName;
    if (req.body.description) post.description = req.body.description;
    if (req.body.quantity) post.quantity = req.body.quantity;
    const filteredArray = data.posts.filter(emp => emp.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, post];
    data.setPosts(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.posts);
}

// REST API to delete a post
const deletePost = (req, res) => {
    const post = data.posts.find(p => p.id === parseInt(req.body.id));
    if (!post) {
        return res.status(400).json({ "message": `Post ID ${req.body.id} not found` });
    }
    const filteredArray = data.posts.filter(p => p.id !== parseInt(req.body.id));
    data.setPosts([...filteredArray]);
    res.json(post);
}

module.exports = {
    getAllPosts,
    createPost,
    updatePost,
    deletePost
}