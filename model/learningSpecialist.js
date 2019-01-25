const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const learningSpecialist = mongoose.model('learningSpecialist', new Schema({
    "learnerList": [],
    "orgId": Number,
    "learningSpecialistId": Number,
}));


module.exports = learningSpecialist