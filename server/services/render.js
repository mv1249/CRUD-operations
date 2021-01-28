// inorder to all the records of the database,i need to make a get request to my api and then that will return me a collection,of the data which is nothing but json,and then i can display that json data into those tables!,so inorder to make a get request to my api,i will be using a module named axios,which will allow me to make a get request to my api,so when the request is ready,that will return a response and that response has a data property,which we will send to the view

const axios = require('axios')


exports.homeRoutes = (req, res) => {

    // making a get request to /api/users

    axios.get('http://localhost/api/users')
        .then(function(response) {
            // console.log(response.data)
            res.render('index', { users: response.data });
        })
        .catch(err => {
            res.send(err);
        })



}

exports.add_user = (req, res) => {
    res.render('add_user')
}


// i have passed params as "{id: req.query.id}" coz i need to update value of that specific user,so i would be requiring the id of that user,so for that i have queried that id,so as we're passing the request of kind "http:/localhost/?id=<id_value>",so the details regarding that specific id will be rendered,so i.e why i have used "userdata" as the param to the function 

exports.update_user = (req, res) => {

    axios.get('http://localhost/api/users', { params: { id: req.query.id } })
        .then(function(userdata) {
            res.render("update", { user: userdata.data })
        })
        .catch(err => {
            res.send(err);
        })
}