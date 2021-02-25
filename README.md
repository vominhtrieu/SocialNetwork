# SocialNetwork
SocialNetwork is a personal project which was built with NodeJs, React, MongoDB, Express, Ant Design, Socket.IO, Redis,...

Implemented features:
<ul>
  <li>Post status</li>
  <li>Like and comment</li>
  <li>Chat</li>
  <li>Notification</li>
  <li>Friend list</li>
</ul>

Upcoming features:
<ul>
  <li>Reply comment</li>
  <li>Audio and video call</li>
</ul>

Usage:
<ul>
  <li>Install Nodejs at https://nodejs.org/en/</li>
  <li>Install MongoDB at https://www.mongodb.com/</li>
  <li>Install Redis at https://redis.io/</li>
  <li>Clone this repository</li>
  <li>Open CMD/Terminal, change directory to repository's location</li>
  <li>cd to src/client and src/server, in each folder, type <code>npm install</code> to install all necessary package</li>
  <li>On Client, type <code>npm start</code> to run React server(Debug mode)</li>
  <li>
      Create .env file with these infomation:
    
      PORT=4000 #Server Port
      DB_HOST=mongodb://localhost:27017/SocialNetwork #MongoDB Url
      CLIENT_BUILD_DIRECTORY=../client/build/ #Optional: specify url to client build directory after running <code>npm run build</code>
      ORIGIN=http://localhost:3000 #React server host
      JWT_TOKEN_SECRET=WriteSomethingHere #Secret for JWT, must be keep secure
  </li>
  <li>Type <code>node app.js</code> to start NodeJs server</li>
  <li>Visit localhost:3000</li>
</ul>

