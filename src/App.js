'use strict'

// Paquete de configuración de variables de entorno.
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

/**
 * Importación de dependencias.
 */
const express = require('express') // Servidor
const morgan = require('morgan') // Analizador de peticiones
const bodyParser = require('body-parser')

// Inicialización del servidor
const app = express()

/**
 * Configuración de variables globales
 */
app.set('port', process.env.PORT || 3000)

/**
 * Middlewares
 */
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/**
 * Configuración de caveceras
 */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    // res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
    // res.header('Access-Control-Allow-Methods', 'GET, POST')
    // res.header('Allow', 'GET, POST')
    next()
})

/**
 * Rutas estaticas
 */
app.use('/static', express.static('public'))

/**
 * Rutas
 */

// Ruta para API REST
app.use('/api/v1', (req, res) => res.json({
    api: 'API REST', 
    version: 'v1'
}) )

// Ruta para API Graphql
app.use('/api/graphql', require('./graphql-api'))

// Ruta por defecto
app.use('/', (req, res) => res.json({
    project: 'money-spend-back',
    version: '1.0',
    author: 'Hugo Gutierrez',
    message: process.env.NODE_ENV !== 'production' ? `The server has been started, go to the path http://localhost:${app.get('port')}/api/graphql or http://localhost:${app.get('port')}/api/v1` : 'What are you looking for?'
}))


/**
 * Start server
 */
app.listen(app.get('port'), () => process.env.NODE_ENV !== 'production' && console.log(`Server has been started on http://localhost:${app.get('port')}`))