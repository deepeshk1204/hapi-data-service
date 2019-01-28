const model = require('../../model');
const util = require('../../util');
const { fork } = require('child_process');

/** @module learningSpecialist */



/**
 * Get all learnering specialist
 * from concierge database
 * @param {*} request null
 * @param {*} reply null
 * @returns obj
 */
const getallls = (request, reply) => {
    console.log(request.headers.token)
    return new Promise((resolve, reject) => {
        model.learningSpecialist.find({}, function (err, doc) {
            if (err) {
                reject(err);
                console.log(err);
            }
            resolve(doc);
        });
    });
}


/**
 * Querys learning Specialist collection
 * append personal information for Ls
 *
 * @param {*} request
 * @param {*} reply
 * @returns  data required for rendering
 * Learning Specialist datatable
 */
const getLSforDatatable = (request, reply) => {
    return new Promise((resolve, reject) => {
        model.learningSpecialist.find({},async (err, doc) => {
            if (err) {
                reject(err);
                console.log(err);
            }
            let tabledata = [];
            // todo:  replace with batch peopleAPI call
            await util.asyncForEach(doc,async (lsData) => {
                const dataObj = lsData._doc
                const process = fork()
                const pidata = await util.platformApi.peopleAPI(dataObj.learningSpecialistId)
                console.log(pidata)
                tabledata.push({
                    lsId: dataObj.learningSpecialistId,
                    email: `${pidata.email}`,
                    language: `${pidata.language}`,
                    name: `${pidata.firstName} ${pidata.lastName}`,
                    learnerCount: dataObj.learnerList.length
                })
            });
            resolve(tabledata);
        });
    });
}


const updateMapping = (mappingObj) => {
    return new Promise((resolve, reject) => {
        mappingObj = {
            lsid:420177,
            learner: [{geid:11},{geid:12},{geid:13}]
        }
        const searchQuery = {
            'learningSpecialistId': mappingObj.lsid,
        };
        const updateQuery = {
            $set: {
                "learningSpecialistId": mappingObj.lsid,
            },
            $addToSet: {
                learnerList: mappingObj.learner
            },
        };

        model.learningSpecialist.findOneAndUpdate(searchQuery, updateQuery, {
            upsert: true
        }, function (err, doc) {
            if (err) {
                reject(err);
                console.log(err);
            }
            resolve('updated documents');
        });
    });
}

module.exports = {
    getallls,
    updateMapping,
    getLSforDatatable
}