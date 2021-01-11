'use strict'

const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema')

module.exports = graphqlHTTP({
    graphiql: true,
    schema
})