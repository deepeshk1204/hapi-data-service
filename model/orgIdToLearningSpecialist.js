const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orgToLearningSpecialist = mongoose.model('orgToLearningSpecialist', new Schema({
    "org_id": Number,
    "ls_id": Number,
    "org_name": String,
    "ls_name": String,
}));


module.exports = orgToLearningSpecialist