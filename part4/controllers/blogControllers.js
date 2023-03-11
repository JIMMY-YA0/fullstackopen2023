const Blog = require('../models/blogModel');

const getAllblogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    res.status(200).json({
      status: 'success',
      data: blogs,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const getBlogById = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    res.status(200).json({
      status: 'success',
      data: blog,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const postNewBlog = async (req, res) => {
  const { title, author, url, likes } = req.body;
  //Set up req.user from the middleware userExtractor
  const user = req.user;
  try {
    const newBlog = await Blog.create({
      title,
      author,
      url,
      likes: likes || 0,
      user: user._id,
    });
    res.status(201).json({
      status: 'success',
      data: newBlog,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteBlog = async (req, res) => {
  const user = req.user;
  const blogId = req.params.id;
  const blog = await Blog.findById(blogId);
  if (!blog) {
    return res.status(404).json({ error: 'blog not in database' });
  }
  if (blog.user._id.toString() === user._id.toString()) {
    try {
      await Blog.findByIdAndRemove(blogId);
      res.status(204).end();
    } catch (error) {
      res.status(403).json({ error: 'user not authorized to delete blog' });
    }
  }
  try {
    await Blog.findByIdAndRemove(blogId);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const updateBlog = async (req, res) => {
  const blogId = req.params.id;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, req.body, {
      new: true,
      runValidators: true,
      context: 'query',
    });
    res.status(200).json({
      status: 'success',
      data: updatedBlog,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

module.exports = { getAllblogs, getBlogById, postNewBlog, deleteBlog, updateBlog };
