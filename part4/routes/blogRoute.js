const express = require('express');
const router = express.Router();
const { getAllblogs, postNewBlog } = require('../controllers/blogControllers');

router.route('/blogs').get(getAllblogs).post(postNewBlog);

module.exports = router;
