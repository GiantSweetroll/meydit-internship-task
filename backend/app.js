const express = require('express')
const cors = require('cors')

// express app
const app = express();
app.listen(3000);

// middleware and static files
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
