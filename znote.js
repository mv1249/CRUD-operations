// here we will be working with ejs as template engine,body parser will allow us to serialize the data,dotenv is used when you dont wanna share your database login credentials,instead you wanna share your source code,so if i wanna install multiple packages in one go,then i use the command "npm i <all packages>",the packages which i installed in this project are : {npm i mongoose morgan nodemon ejs body-parser dotenv axios}


// now if you wanna use nodemon for starting teh localhost,in the package.json file,in the "start" section instead of node start.js use "nodemon start.js",nodemon is very efficient and it reloads the content automatically when eva you make new changes here.

// project structure:


// we need to create the assests folder which consists of img,css and js, then we need to create the views folder which will look after all the templates which we will be using in this project,then we will be making the server folder which consists of all the database connectivity and the models,schemas,requests,services etc etc which is used to interact with the database and vice-verse


// in the server.js i will be creating the http server using express


// i will be storing the data on cloud using the mongodb atlas,so the data will be stored in the cloud,using mongodb atlas!