const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI;
console.log(mongoURI);
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true,  // Enforce TLS/SSL connection
    tlsAllowInvalidCertificates: false,  // Set to true if using self-signed certificates
  });
const database = mongoose.connection;

database.on('error',(error) => {
    console.log(error);
});

database.once('connected', () => {console.log("Database Connected");})