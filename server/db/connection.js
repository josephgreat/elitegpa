const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI;
console.log(mongoURI);
mongoose.connect(mongoURI);
const database = mongoose.connection;

database.on('error',(error) => {
    console.log(error);
});

database.once('connected', () => {console.log("Database Connected");})