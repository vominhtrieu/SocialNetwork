# SocialNetwork
SocialNetwork is a personal project which was built with NodeJs, React,...

Project will have these functionalities:
<ul>
  <li>Post and interact with status</li>
  <li>Make friend with others</li>
  <li>Communication</li>
</ul>

Usage:
<ul>
  <li>Install Nodejs at https://nodejs.org/en/</li>
  <li>Install MongoDB at https://www.mongodb.com/</li>
  <li>Clone this repository</li>
  <li>Open CMD/Terminal, change directory to repository's location</li>
  <li>cd to src/client and src/server, in each folder, type <code>npm install</code> to install all necessary package</li>
  <li>On Client, type <code>npm start</code> to run React server(Debug mode)</li>
  <li>
      Create .env file with these infomation:
    
      PORT=4000 #Server Port
      DB_HOST=mongodb://localhost:27017/SocialNetwork #MongoDB Url
      CLIENT_BUILD_DIRECTORY=../client/build/ #Optional: specify url to client build directory after running <code>npm run build</code>
      ORIGIN=http://localhost:3000 #React server
      JWT_TOKEN_SECRET=WriteSomethingHere #Secret for JWT, must be keep secure
  </li>
  <li>Type <code>node app.js</code> to start NodeJs server</li>
  <li>Visit localhost:3000</li>
</ul>
