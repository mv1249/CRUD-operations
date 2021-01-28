// connecting to the mongoDB database using mongoose,basically using the async-await method,i.e asynchronous method,using try and catch block as shown ↓ 


// once the connection is established,in the terminal we will have a msg like ["MongoDB connected : cluster0-shard-00-02.7ss1p.mongodb.net"]

const mongoose = require('mongoose')


const connectDB = async() => {
    try {
        // mongodb connection string

        const con = await mongoose.connect(process.env.MONGO_URI, {

            // these properties will remove the unwanted warnings in the console!


            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })

        console.log(`MongoDB connected : ${con.connection.host}`)

    } catch (err) {

        console.log(err);
        process.exit(1)
    }
}

// exporting the mongodb function which we will use in the main server.js file!!

module.exports = connectDB