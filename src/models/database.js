'use strict'

const Sequelize = require('sequelize')

let sequelize = null

module.exports = function connect () {
    try {
        if (!sequelize) {
            sequelize = new Sequelize(
                process.env.DBNAME,
                process.env.DBUSER,
                process.env.DBPASS,
                {
                    host: process.env.DBHOST,
                    dialect: process.env.DBDIALECT
                }
            )
        }
        // sequelize.sync()
        return sequelize
    } catch (error) {
        console.error('/**** No se ha podido conectar a la base de datos. ****/', error)
    }
}