import http from "http";
import app from './app/index.js'


//create the Server

const PORT = process.env.PORT 
const server = http.createServer(app)
server.listen(PORT,console.log(`Server is up and running on port ${PORT}`));
