const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();

app.get('/', (req, res) => {
    res.send(`Welcome to my site.`)
});

const breadsController = require('./controllers/bread_controllers.js')
app.use('/breads', breadsController)

// MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())


app.listen(PORT, function () {
    console.log(`listening on port ${PORT}`);
});