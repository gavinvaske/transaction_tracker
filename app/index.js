const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();

const PORT = 3000;

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Body Parser
app.use(express.urlencoded({extended: false}));

// Routes
app.use('/', require('./routes/index'));

// Start Server
app.listen(PORT, () => {
    console.log(`Server started listening on PORT = ${PORT}`);
});