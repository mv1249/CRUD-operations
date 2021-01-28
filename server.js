// so i am using nodemon to start my localhost,so in the package.json i have specified that my start must be "nodemon server.js",so inorder to let that happen,in the terminal go to the directory wher eyour package.json file is present,and then type "npm start",it will automatically start the server for you!,by default the port of local host is set to 80,so i'm using that port!




const express = require('express');


// these 2 lines of code are to simply set the port number,nothing more than that!!!,the main use of env files is to protect your credientials,which you have been using on the port from other users,like you can share the base code to them,but teh other users must make there own env files inorder to access them




const dotenv = require('dotenv');

dotenv.config({ path: 'config.env' })

const PORT = process.env.PORT || 80



// morgan module is used to get the requests which the user has made to the server,i.e get,post etc etc,with response time as well


const morgan = require('morgan')

const bodyparser = require('body-parser')

const path = require('path')


// exporting the database connectivity file!!

const connectDB = require('./server/database/connection')


app = express();

// log requests

app.use(morgan('tiny'))


// calling the mongodb connection

/// once the connection is established,in the terminal we will have a msg like ["MongoDB connected : cluster0-shard-00-02.7ss1p.mongodb.net"],once the connection is made,then i have to make an API and make the CRUD operations!


connectDB()

// parse request to body parser

app.use(bodyparser.urlencoded({ extended: true }))


// setting the view engine as ejs,ejs stands for embedded javascript templating

app.set('view engine', 'ejs')

// after setting the template engine,i have to set the path where i have declared my views,so i have to set that path using the resolve package

// app.set("views", path.resolve(__dirname, 'views'))


// loading assets i.e css/js and setting their path as assests/css for css folder and assets/js for js folder

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))


// load routers,here i have specified all the routes which are required to switch betwen different pages,and {'./server},this "./"means that switch one directory outside!


app.use('/', require('./server/routes/router'))



app.listen(PORT, () => {
    console.log('Server is listening on localhost')
})