const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}));
app.use('/', require('./routes/index'));

app.listen(PORT, () => {
    console.log(`Server started listening on PORT = ${PORT}`);
});