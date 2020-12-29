const mongoose = require('mongoose');
const databaseURI = process.env.databaseURI;

function connectToDatabase() {
    if (!databaseURI) {
        throw new Error('Database URI is not defined');
    }

    mongoose.connect(databaseURI, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });
}

module.exports = {
    connectToDatabase
};