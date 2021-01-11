'use strict'

const Sequelize = require('sequelize')
const connect = require('../database')
const sequelize = connect()
const { enCode } = require('../../helpers')

const UsersModel = sequelize.define('users', {
    uId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get (x) { return enCode(this.getDataValue(x)) }
    },
    uEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    uPassword: {
        type: Sequelize.STRING,
        allowNull: false
    },
    uState: {
        type: Sequelize.SMALLINT,
        defaultValue: 2
    },
    uCreateAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    uUpdateAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = UsersModel