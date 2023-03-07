const express = require('express');
const BlogRoute = require('./routes/blogRoute');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

morgan.token('req-data', (req) => {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[content-length] :req-data - :response-time ms'));

app.use('/api', BlogRoute);

module.exports = app;
