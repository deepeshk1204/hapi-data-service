const seedLSMapping = require('../../controller/seedData/seedData')

const seedData = {
    method: 'GET',
    path: '/seed',
    handler: seedLSMapping.seedLSMapping,
    config: {
        tags: ['api'],
        description: 'Says hello!',
        notes: 'Some important notes when using this',
    }
}

module.exports = {
    seedData
};