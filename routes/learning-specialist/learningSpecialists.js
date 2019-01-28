const ls = require('../../controller/learning-specialist/learningSpecialists')

const getAllLS = {
    method: 'GET',
    path: '/ls',
    handler: ls.getallls,
    config: {
        tags: ['api'],
        description: 'Says hello!',
        notes: 'Some important notes when using this',
    }
}

const getLSTabledata = {
    method: 'GET',
    path: '/lstd',
    handler: ls.getLSforDatatable,
    config: {
        tags: ['api'],
        description: 'Says hello!',
        notes: 'Some important notes when using this',
    }
}


const updateLs = {
    method: 'GET',
    path: '/update_ls',
    handler: ls.updateMapping,
    config: {
        tags: ['api'],
        description: 'Says hello!',
        notes: 'Some important notes when using this',
    }
}

module.exports = {
    getAllLS,
    updateLs,
    getLSTabledata
};