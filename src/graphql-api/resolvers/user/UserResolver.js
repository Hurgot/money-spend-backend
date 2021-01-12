'use strict'

const bcrypt = require('bcrypt')
const UsersModel = require('../../../models/user/UsersModel')
const UserProfilesModel = require('../../../models/user/UserProfilesModel')
const { deCode, linkBelongsTo } = require('../../../helpers')

const UserResolverQueries = {
    getUsers: async () => await UsersModel.findAll(),
    getUserById: async (root, { uId }) => await UsersModel.findOne({ where: { uId: deCode(uId) } }),
    getUserByCredentials: async (root, { uEmail, uPassword }) => {
        const uData = await UsersModel.findOne({ where: { uEmail: uEmail } })
        if (!uData || !bcrypt.compareSync(uPassword, uData.uPassword) || uData?.uState !== 1) return null
        return uData
    }
}

const UserResolverMutations = {
    async createUser(root, { input }) {
        const passwordHash = await bcrypt.hashSync(input.uPassword, 10)
        const uData = await UsersModel.create({ ...input, uPassword: passwordHash })
        if (!uData) throw new Error('Algo ha salido mal.')
        return await UsersModel.findOne({ where: { uId: deCode(uData.uId) } })    
    },
    async editUser(root, { uId, input }) {
        const uData = await UsersModel.findOne({ attributes: ['uId'] }, { where: { uId: deCode(uId) } })
        if (!uData) throw new Error('No se ha podido encontrar el usuario.')

        const qData = await UsersModel.update({ ...input }, { where: { uId: deCode(uData.uId) } })
        if (!qData) throw new Error('Algo ha salido mal.')
        
        return await UsersModel.findOne({ where: { uId: deCode(uData.uId) } })
    }
}

const UserResolverTypes = {
    User: {
        userprofile: async ({ uId }) => await UserProfilesModel.findOne({ where: { uId: deCode(uId) } })
    }
}

module.exports = {
    UserResolverQueries,
    UserResolverMutations,
    UserResolverTypes
}