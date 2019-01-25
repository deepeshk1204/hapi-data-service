const axios = require('axios');
const config = require('../../config/config')
const model = require('../../model');
const util = require('../../util')

/** @module seedData */

/**
 * Seed data by getting LS from
 * platform
 * @param {*} request null
 * @param {*} reply null
 * @returns null
 */
const seedLSMapping = async (request, reply) => {
    const TOKEN = request.headers.token;
    const lsData = await getLearningSpecialistFromPlatform();
    const ls_learner_mapping = await getLearnersViaOrganisationAPI(lsData.learningSpecialists, TOKEN);
    const statusObj = { success: [],failure: []}

    await util.asyncForEach(ls_learner_mapping, async (lsMapping) => {
        try {
            await updateLearnerToLSMapping(lsMapping)
            statusObj.success.push(`${lsMapping.userId}`)
        } catch (error) {
            statusObj.failure.push(`${lsMapping.userId}`)
        }
    })

    return statusObj
}

const getLearningSpecialistFromPlatform = (request, reply) => {
    return new Promise((resolve, reject) => {
        axios.get('https://testapi.globalenglish.com/v1/learningspecialist?app_key=57FFD0478A526637BCB3098EF6A94F9C')
            .then(res => {
                resolve(res.data);
            })
            .catch(e => {
                reject(e);
                console.log(e)
            })
    });
}
/**
 *
 * @param {Array} lsList list of learning specialist
 * @param {String} TOKEN Token generated per user
 * @returns ls mapping with learners mapping
 */
const getLearnersViaOrganisationAPI = (lsList, TOKEN) => {
    return new Promise((resolve, reject) => {
        const ls_learner_mapping_list = []
        const lsList_filtered = lsList.filter(ls => ls.orgId != -1)
        lsList_filtered.forEach(async (ls, index) => {
            try {
                const organizationPeopleData = await axios.get(config.PLATFORM_API_URL + "/v1/organizations/" + ls.orgId + "/people?token=" + TOKEN)
                ls_learner_mapping_list.push(
                    Object.assign(ls, organizationPeopleData.data)
                )
            } catch (error) {
                console.log(error);
                reject(error)
            }
            if (ls_learner_mapping_list.length == lsList_filtered.length) {
                resolve(ls_learner_mapping_list)
                // updateLearnerToLSMapping(ls_learner_mapping_list)
            }
        });
    });
}

/**
 *
 *
 * @param {Array} mapdata An array of learner to LS mapping
 * @returns db status
 */
const updateLearnerToLSMapping = (mapdata) => {
    return new Promise((resolve, reject) => {
        const searchQuery = {
            'learningSpecialistId': mapdata.userId,
            "orgId": mapdata.orgId
        };
        const updateQuery = {
            $set: {
                "learningSpecialistId": mapdata.userId,
                "orgId": mapdata.orgId
            },
            $addToSet: {
                learnerList: mapdata.organizationPeople
            },
        };

        model.learningSpecialist.findOneAndUpdate(searchQuery, updateQuery, {
            upsert: true
        }, function (err, doc) {
            if (err) {
                console.log(err)
                console.log("value NOT added ")
            } else {
                resolve('success');
                console.log("value added ")
            }
        });
    });
}


module.exports = {
    seedLSMapping
}