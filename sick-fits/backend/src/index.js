const cookieParser = require('cookie-parser');
require('dotenv').config({ path: 'variables.env' });
const jwt = require('jsonwebtoken');
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.express.use(cookieParser());

// decode the JWT and add the user-id to each request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // put user-id onto the request for further requests
    req.userId = userId;
  }
  next();
});

// populate the user on each request
server.express.use(async (req, res, next) => {
  if (!req.userId) return next();
  const user = await db.query.user(
    { where: { id: req.userId } },
    '{ id, permissions, email, name }'
  );
  req.user = user;

  next();
});

console.log([process.env.FRONTEND_URL, process.env.VUE_FRONTEND_URL]);
server.start(
  {
    cors: {
      credentials: true,
      origin: [process.env.FRONTEND_URL, process.env.VUE_FRONTEND_URL],
    },
  },
  deets => {
    console.log(`Server is now running on http://localhost:${deets.port}`);
  }
);
