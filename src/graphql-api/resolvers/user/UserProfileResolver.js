'use strict'

const UsersModel = require('../../../models/user/UsersModel')
const UserProfilesModel = require('../../../models/user/UserProfilesModel')
const { deCode } = require('../../../helpers')

const UserProfileResolverQueries = {

}

const UserProfileResolverMutations = {
    createProfileUser: async (root, { uId, input }) => {
        const uData = await UsersModel.findOne({ attributes: ['uId'], where: { uId: deCode(uId), uState: 1 } })
        if (!uData) throw new Error('El usuario no se encuentra registrado.')
        let upData = await UserProfilesModel.findOne({ attributes: ['upId'], where: { uId: deCode(uId) } })
        if (upData) throw new Error('El usuario ya tiene un perfil.')
        upData = await UserProfilesModel.create({ ...input, uId: deCode(uId) })
        if (upData) return await UserProfilesModel.findOne({ where: { upId: deCode(upData.upId) } })
        return null
    },
    editUserProfile: async (root, { uId, input}) => {
        let upData = await UserProfilesModel.findOne({ attributes: ['upId'], where: { uId: deCode(uId) } })
        if (!upData) throw new Error('No se ha encontrado el usuario.')
        upData = await UserProfilesModel.update({ ...input }, { where: { upId: deCode(upData.upId) } })
        if (!upData) throw new Error('Algo ha salido mal.')
        return await UserProfilesModel.findOne({ where: { uId: deCode(uId) } })
    }
}

const UserProfileResolverTypes = {

}

module.exports = {
    UserProfileResolverQueries,
    UserProfileResolverMutations,
    UserProfileResolverTypes
}