const http = require('http');
const app = require('./app');
const { mongoConnect } = require('./utils/mongo');

const logger = require('./utils/logger');

const PORT = 3003;

app.listen(PORT, async () => {
  await mongoConnect();
  logger.info(`Server running on port ${PORT}`);
});
