const express = require('express');
const router = express.Router();
const farmerPostController = require('../../controllers/FarmerPostController');

router.route('/')
    .get(farmerPostController.getAllPosts)
    .post(farmerPostController.createPost)
    .put(farmerPostController.updatePost)
    .delete(farmerPostController.deletePost)


module.exports = router;