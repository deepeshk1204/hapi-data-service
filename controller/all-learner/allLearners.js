// https://testapi.globalenglish.com/v1/people/list?searchFilter=[{"filter":"productId","filterBy":"22,23"}]&token=33ea5790ffb0da34723f542388ddec57a576558c

const util = require('../../util');
// const model = require('../../model');


const getAllLearners = async (request, reply) => {
    console.log(request.headers.token)
    const TOKEN = request.headers.token;
    const list = await util.platformApi.getAllLearners(TOKEN)
    return list
    // console.log(list)
}


module.exports = {
    getAllLearners
}