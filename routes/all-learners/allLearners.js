const AL = require('../../controller/all-learner/allLearners')

const getAllLearners = {
    method: 'GET',
    path: '/all_learners',
    handler: AL.getAllLearners,
    config: {
        tags: ['api'],
        description: 'Says hello!',
        notes: 'Some important notes when using this',
    }
}

module.exports = {
    getAllLearners
};