const mongoose = require('mongoose');

function connectToDatabase(databaseURI) {
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