const cookieParser = require('cookie-parser')
require('dotenv').config({ path: 'variables.env' })
const createServer = require('./createServer')
const db = require('./db')

const server = createServer();

server.express.use(cookieParser())
// TODO: use express middleware to populate current user

console.log([process.env.FRONTEND_URL, process.env.VUE_FRONTEND_URL])
server.start({
  cors: {
    credentials: true,
    origin: [process.env.FRONTEND_URL, process.env.VUE_FRONTEND_URL],
  }
}, deets => {
  console.log(`Server is now running on http://localhost:${deets.port}`)
})