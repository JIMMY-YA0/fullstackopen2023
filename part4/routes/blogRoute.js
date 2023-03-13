const express = require('express');
const BlogRouter = express.Router();
const { userExtractor } = require('../middleware/middleware');
const {
  getAllblogs,
  getBlogById,
  postNewBlog,
  deleteBlog,
  updateBlog,
} = require('../controllers/blogControllers');

BlogRouter.route('/').get(getAllblogs).post(userExtractor, postNewBlog);
BlogRouter.route('/:id').get(getBlogById).delete(userExtractor, deleteBlog).put(updateBlog);

module.exports = BlogRouter;
