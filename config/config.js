const env = process.env.NODE_ENV;

if(env != 'prod'){
    require('dotenv').config()
}

const config = {
    DB_CONNSTR: process.env.COSMOSDB_CONNSTR,
    PLATFORM_API_URL:process.env.PLATFORM_API_URL || 'https://testapi.globalenglish.com',
    APP_KEY: process.env.APP_KEY || 'e4a297a0f76119a442c2595ac040673e'
};




module.exports = config;