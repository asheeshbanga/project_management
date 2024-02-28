const express = require('express');
const colors = require('colors');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const connectToDB = require('./config/db');
const port = process.env.PORT || 5050;

const app = express();

// Connect to DB
connectToDB();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development' 
}))

app.listen(port, console.log(`Server running on port ${port}`));