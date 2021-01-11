'use strict'

const { makeExecutableSchema } = require('graphql-tools')
const { UserResolveQueries, UserResolveMutations } = require('./resolvers/user/UserResolver')

const typeDefs = `
    type User {
        uId: ID!
        uEmail: String
        uState: Int!
        uCreateAt: String
        uUpdateAt: String
    }

    "Entrada para crear un usuario."
    input UserCreateInput {
        uEmail: String!
        uPassword: String!
    }

    "Entrada para editar un usuario."
    input UserEditInput {
        uState: Int
    }

    "All Queries."
    type Query {
        "Obtiene todos los usuarios."
        getUsers: [User]
        "Obtine un usuario por su id."
        getUserById(uId: ID!): User
        "Busca un usuario por su email y contraseña."
        getUserByCredentials(uEmail: String!, uPassword: String!): User
    }

    "All Mutations."
    type Mutation {
        "Crea un usuario."
        createUser(input: UserCreateInput!): User
        "Edita un usuario"
        editUser(uId: ID!, input: UserEditInput!): User
    }    
` 

module.exports = makeExecutableSchema({
    typeDefs,
    resolvers: {
        Query: {
            ...UserResolveQueries
        },
        Mutation: {
            ...UserResolveMutations
        }
    }
})