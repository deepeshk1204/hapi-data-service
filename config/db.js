const mongoose = require('mongoose');
const config = require('./config')

mongoose.connect(config.DB_CONNSTR, {
        useNewUrlParser: true
    })
    .then(() => console.log('DB Connected'), (err) => console.log(err));


