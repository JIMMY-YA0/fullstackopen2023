const Blog = require('../models/blogModel');

const getAllblogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
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

const postNewBlog = async (req, res) => {
  const { title, author, url, likes } = req.body;
  try {
    const newBlog = await Blog.create({
      title,
      author,
      url,
      likes,
    });
    res.status(201).json({
      status: 'success',
      data: newBlog,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getAllblogs, postNewBlog };
