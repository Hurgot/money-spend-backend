'use strict'

const { makeExecutableSchema } = require('graphql-tools')
const { UserResolveQueries, UserResolveMutations } = require('./resolvers/user/UserResolver')
const { UserProfileResolverQueries, UserProfileResolversMutations } = require('./resolvers/user/UserProfileResolver')

const typeDefs = `
    "User type."
    type User {
        uId: ID!
        userprofile: UserProfile
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

    "User Profile Type."
    type UserProfile {
        upId: ID!
        user: User
        upName: String!
        upLastname: String!
        upPhone: String
        upCreateAt: String
        upUpdateAt: String
    }

    "Entrada para crear el perfil del usuario."
    input UserProfileInput {
        upName: String!
        upLastname: String!
        upPhone: String
    }

    "Entrada para editar el perfil del usuario."
    input UserProfileEditInput {
        upName: String
        upLastname: String
        upPhone: String
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

        "Crea el perfil del usuario."
        createProfileUser(uId: ID!, input: UserProfileInput!): UserProfile
        "Edita el perfil del usuario."
        editUserProfile(uId: ID!, input: UserProfileEditInput): UserProfile
    }    
` 

module.exports = makeExecutableSchema({
    typeDefs,
    resolvers: {
        Query: {
            ...UserResolveQueries,
            ...UserProfileResolverQueries
        },
        Mutation: {
            ...UserResolveMutations,
            ...UserProfileResolversMutations
        }
    }
})