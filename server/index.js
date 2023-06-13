const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
require('dotenv').config()

const sequelize = require('./util/database');

const errorHandler=require('./middleware/errorMiddleware')
const actionLogger=require('./middleware/actionLoggerMiddleware')

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors())

app.use(express.static(__dirname + '/public'));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use(actionLogger)
//test route
app.get('/', (req, res, next) => {
  res.send('Hello World');
});


app.use('/api/v1',require('./routes'))


// app.use('/users', require('./routes/users'));
// app.use('/products', require('./routes/product'));
// app.use('/category', require('./routes/category'));
// app.use('/dropdowns', require('./routes/dropdown'));
// app.use('/cart', require('./routes/cart'));

// app.use('/auth',require('./routes/auth'))

//error handling
app.use(errorHandler);
// app.use((error, req, res, next) => {
//   console.log(error);
//   const status = error.statusCode || 500;
//   const message = error.message;
//   res.status(status).json({ message: message });
// });

//sync database


// Camps.sync({force:true});
// require('./models/mastervalues').sync({force:true});

sequelize
  .sync({
    force: true,
    alter: true,
  })
  .then(result => {
    console.log("Database connected");
    app.listen(4000);
  })
  .catch(err => console.log(err));
