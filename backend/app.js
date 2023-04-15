const express = require('express')
const cors = require('cors')

const consumerRoutes = require('./routes/consumerRoutes')
const authRoutes = require('./routes/authRoutes')
const makerRoutes = require('./routes/makerRoutes')
const queryRoutes = require('./routes/queryRoutes')

// express app
const app = express();
app.listen(3000);

// db
require('./controllers/dbController').init()

// middleware and static files
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({
    limit: 2e+7
}));

// routes
app.use('/consumer', consumerRoutes)
app.use('/auth', authRoutes)
app.use('/maker', makerRoutes)
app.use('/queries', queryRoutes)