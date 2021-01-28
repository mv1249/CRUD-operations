// home page

const express = require('express')


// if i use const app = express(),then this will create a new app,but i dont want that,i want the existing app and i wanna route through them,so i will create an Router object


const route = express.Router()


// here we are having this call backfunctions right,i will make them under services,i.e i will define them under services folder which i created,so that i can modify them easily!,so instead of ↓

// route.get('/', (req, res) => {
//     res.render('index')
// })

// i'll be using the exports function and will render the views using ↓

const services = require('../services/render')


// requiring the controller.js file,as in that file we're gonna perfrom the main "CRUD" operations!!


const controller = require('../controller/controller')



route.get('/', services.homeRoutes)


// for adding the user via filling the form,i.e adding a new user

route.get('/add-user', services.add_user)


// for updating the user via filling the form,i.e updation of user

route.get('/update-user', services.update_user)

// i created my routes,but i need to export them,only then i will be able to use them in the server.js file!,so by using "modules.exports = route",so route is the object which i specified here,so i have exported that and,that object i can use in the server.js file


// API router

// for creating a user
route.post('/api/users', controller.create)

// for finding an user

route.get('/api/users', controller.find)


// as i will be updating the user based on its id,so i need to kind of send the "id" to the controller,so for that reason,i have used the "put" method of http,as shown ↓

route.put('/api/users/:id', controller.update)

// as i wanna delete any user based on its id,i have to send the "id" to the controller,stating that i need to delete

route.delete('/api/users/:id', controller.delete)

module.exports = route