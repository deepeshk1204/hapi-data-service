const LS = require('./learning-specialist/learningSpecialists');
const AL = require('./all-learners/allLearners');
const seedData = require('./seed-data/seedData');
// const docs = require('../docs');
const emptyRoute = {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return 'success'
    }
};

module.exports = [LS.getAllLS,LS.getLSTabledata,seedData.seedData,AL.getAllLearners,emptyRoute];