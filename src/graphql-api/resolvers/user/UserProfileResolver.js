'use strict'

const UsersModel = require('../../../models/user/UsersModel')
const UserProfilesModel = require('../../../models/user/UserProfilesModel')
const { deCode } = require('../../../helpers')

const UserProfileResolverQueries = {

}

const UserProfileResolversMutations = {
    createProfileUser: async (root, { uId, input }) => {
        const uData = await UsersModel.findOne({ attributes: ['uId'], where: { uId: deCode(uId), uState: 1 } })
        if (!uData) throw new Error('El usuario no se encuentra registrado.')
        const upData = await UserProfilesModel.findOne({ attributes: ['upId'], where: { uId: deCode(uId) } })
        if (upData) throw new Error('El usuario ya tiene un perfil.')
        return await UserProfilesModel.create({ ...input, uId: deCode(uId) })
    }
}

module.exports = {
    UserProfileResolverQueries,
    UserProfileResolversMutations
}