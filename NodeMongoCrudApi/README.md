# NodeMongoCrudApi

Make Sure set mongodb path in db.js file
const url = path; //process.env.MONGOURL;  

Install npm install -g express-generator
	express NodeMongoCrudApi (name of project)
	cd NodeMongoCrudApi
	npm install
	
run project with node server NodeMongoCrudApi 
for automatic run application install npm i nodemon --save (--save for saving package name in package.json file)
	nodemon start


For Mongodb 
install mongo db
run mongo
copy path paste in db.js file like  const uri = 'mongodb://localhost:27124/dbname'
for graphical view install robo 3t

connectivity in db.js file

incase problem try wtih On Windows, use this command:

> set DEBUG=myapp:* & npm start


use postman
get -- http://localhost:3000/book/get
in app.js 
app.use('/book', bookController);

get -- http://localhost:3000/get
app.use('/', bookController);

Solve cors error 
npm install cors
var cors = require('cors');
// Then use it before your routes are set up:
app.use(cors());
