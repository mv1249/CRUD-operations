// here we will be using all the CRUD operations,all teh functionalities is gonna be used here,like Select,insert,delete etc..,eveything will be monitored here itself!

// so go to model folder and from that get the model.js file in which i have defined the schema of the database

var Userdb = require('../model/model')


// create and save new user object

exports.create = (req, res) => {

    // validating the request,i.e if the request is a POST request,then only allow!

    // if user makes a post request with an empty body,simply throw one msg and return

    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty" });
        return;
    }

    // as we know when an user makes a post request,all the data of the form is stored in the body of request

    // create a new user,as we have speicified "name" field in the forms,so the request i.e "req" will try to catch the name field which we have specified in the form,so we will create an user based on the scheme which we made in the model.js file!


    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    // save user in database,there will be a response send by the database,we need to react to that response,as shown,in case we could'nt understand the response,we need to handle that error as shown ↓

    // after making all the changes,then try this on postman!,before trying it on the original project!,i.e try the api for url which is "https://localhost:80/api/create" as a post request on post man,there share some data and then check the status code,if the status code is 200 then the form is working fine!


    // after filling the form redirect the user to new user page!


    user
        .save(user)
        .then(data => {
            // res.send(data)
            res.redirect('/add-user')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        })

}

// Finding a  user object,so i'm gonna use "find()" to retrive the information of all users as well as a unique person!

// simply i'll retrive the data from the database and if the data is present the promise will be answered and the response will display the data,if there was any error while retriving the data,then inorder to handle that we use catch block and the body of catch says the action to be taken! against the error!


// the data will be in format of json object as mongodb stores the data in form of collections,here is a preview!

// {
//     "_id": "60128b6158eabb5678943235",
//     "name": "abc",
//     "email": "abc@gmail.com",
//     "gender": "male",
//     "status": "inactive",
//     "__v": 0
// },


// suppose i wanna retrive information of a specific id,then i will be using the query method request,i.e i will us "req.query.id",and the url will look something like : {http://localhost:80/api/users/?id=6012a86d17bc3e0b685adc5c},as you can see the key which is id and the value associated with it!,to retrive all the records use {http://localhost:80/api/users}





// the above code is for retriving data of multiple users,now i'll modify this code and make it for single user as well

exports.find = (req, res) => {

    // using the query method of the request,i will check if that id is present or not,if present then return its record,else return all the records available in the database!

    // the if condition is to check of that specific user is present or not,if present then return all the records of that user and if not found return all the records

    if (req.query.id) {
        const id = req.query.id
        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: `User not found by id ${id}` });
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: 'Oops! Something went wrong' })
            })

        // ↓ will be if that single user is not found!
    } else {
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating a create operation"
                });
            })
    }

}


// Update an user object with the specified user_id


// as update is a put request,so i need to get the id of the collection,so for that i have to grab that id as shown ↓,the api url for update is "//api/users/:id",that id term at the last will contain the address of the collection record!,there are 2 kinds of requests one is with "params" and the other is with "queries",params are the ones which have parameters associated with them in the url,ex for parameter requests are update,delete etc,put requets etc..and the normal ones get and post are query requests!

exports.update = (req, res) => {


    // if the body is empty, then return error message
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }


    const id = req.params.id
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot update user with id ${id}` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update user information" })
        })


}




// Deleting an user object with the specified user_id

// Similar to update there is a method known as findByIdANdDelete() which takes in the id param,i.e the one which wants to be deleted,and once that is done this returns a response,and that response will have the data and check if the data is avaialabel or not,if not available then send 404 error,else delete that data,as the function does that!!,this is almost similar to findByIdAndUpdate() method as shown ↑

exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                res.send({
                    message: "User was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}