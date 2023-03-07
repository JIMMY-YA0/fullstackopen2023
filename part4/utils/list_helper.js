const dummy = (blogs) => {
  // ...
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  const mostLikeBlog = blogs.reduce((max, blog) => (max.likes > blog.likes ? max : blog));
  return {
    title: mostLikeBlog.title,
    author: mostLikeBlog.author,
    likes: mostLikeBlog.likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
