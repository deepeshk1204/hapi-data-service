const axios = require('axios')
const config = require('../config/config');


const platform_api = config.PLATFORM_API_URL
const app_key = config.APP_KEY

const peopleAPI = async (edgeUid) => {

    const piData = await axios.get(`${platform_api}/v1/people?app_key=${app_key}&edgeUid=${edgeUid}&geId=0`)
    return piData.data;
}

const getLearningSpecialistAPI = async () => {
        const lsList = axios.get(`${platform_api}/v1/learningspecialist?app_key=${app_key}`)
        console.log(lsList)
        return lsList.data;
}

const getAllLearners = async (token) => {
    // /v1/people/list?searchFilter=[{"filter":"productId","filterBy":"22,23"}]&token=33ea5790ffb0da34723f542388ddec57a576558
    const learnerList = await axios.get(`${platform_api}/v1/people/list?searchFilter=[{"filter":"productId","filterBy":"22,23"}]&token=${token}`)
    // console.log(learnerList)
    return learnerList.data;
}

module.exports ={
    peopleAPI,
    getAllLearners,
    getLearningSpecialistAPI
}