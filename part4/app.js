const express = require('express');
const BlogRouter = require('./routes/blogRoute');
const UsersRoute = require('./routes/userRoute');
const LoginRouter = require('./routes/loginRoute');
const middleware = require('./middleware/middleware');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

morgan.token('req-data', (req) => {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[content-length] :req-data - :response-time ms'));

app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use('/api/blogs', BlogRouter);
app.use('/api/users', UsersRoute);
app.use('/api/login', LoginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;
