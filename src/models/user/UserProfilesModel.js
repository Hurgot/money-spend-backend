'use strict'

const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../helpers')
const UsersModel = require('./UsersModel')

const UserProfilesModel = sequelize.define('userprofiles', {
    upId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return enCode(this.getDataValue(x)) }
    },
    uId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
            model: UsersModel,
            key: 'uId'
        },
        get (x) { return enCode(this.getDataValue(x)) }
    },
    upName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    upLastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    upPhone: {
        type: Sequelize.STRING(20)
    },
    upCreateAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    upUpdateAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = UserProfilesModel