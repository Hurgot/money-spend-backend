'use strict'

const bcrypt = require('bcrypt')
const UsersModel = require('../../../models/user/UsersModel')
const { Op } = require('sequelize')
const { deCode } = require('../../../helpers')

const UserResolveQueries = {
    getUsers: async () => await UsersModel.findAll(),
    getUserById: async (root, { uId }) => await UsersModel.findOne({ where: { uId: deCode(uId) } }),
    getUserByCredentials: async (root, { uEmail, uPassword }) => {
        const uData = await UsersModel.findOne({ where: { uEmail: uEmail } })
        if (!uData || !bcrypt.compareSync(uPassword, uData.uPassword) || uData?.uState !== 1) return null
        return uData
    }
}

const UserResolveMutations = {
    async createUser(root, { input }) {
        const passwordHash = await bcrypt.hashSync(input.uPassword, 10)
        return await UsersModel.create({ ...input, uPassword: passwordHash })
    },
    async editUser(root, { uId, input }) {
        const uData = await UsersModel.findOne({ attributes: ['uId'] }, { where: { uId: deCode(uId) } })
        if (!uData) return null

        const qData = await UsersModel.update({ ...input }, { where: { uId: deCode(uData.uId) } })
        if (!qData) return null
        
        return await UsersModel.findOne({ where: { uId: deCode(uData.uId) } })
    }
}

module.exports = {
    UserResolveQueries,
    UserResolveMutations
}