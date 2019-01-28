'use strict';
require('./model')
require('./config/db')
const Hapi = require('hapi');
const joi = require('joi');
const routes = require('./routes')

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});


/**
 * Async init func
 *
 */
const init = async () => {
    await server.register([
        require('inert'),
        require('vision'),
        {
            plugin: require('hapi-pino'),
            options: {
                prettyPrint: true,
                logEvents: ['log', 'onPostStart', 'request-error']
            }
        },
        {
            plugin: require('hapi-swaggered'),
            options: {
                info: {
                    title: 'Concierge API',
                    description: 'API documentation for concierge',
                    version: '1.0',
                },
            },
        },
        {
            plugin: require('hapi-swaggered-ui'),
            options: {
                title: 'Concierge API',
                path: '/api/docs',
            }
        }
    ]);
    server.route({
        method: 'GET',
        path: '/js/{param*}',
        handler: {
            directory: {
                path: './docs',
                index: ['index.html']
            }
        }
    });
    await server.start();
    // server.log(`Server running worker ${clusterId} &  at port ${server.info.uri}`);
    server.log(`Server running at port ${server.info.uri}`);
};

server.realm.modifiers.route.prefix = '/concierge'
// console.log(routes)
server.route(routes)

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();

module.exports = {
    init,
    server
};