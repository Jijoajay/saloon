const mongoose = require('mongoose')
require('dotenv').config();

mongoose.connect(process.env.MONGODB_CONNECTION, {
    dbName: 'saloon'
})
    .then(() => {
        console.log('MongoDB connected Successfully')
    })
    .catch(error => {
        console.log('MongoDB coneection is not available' + error)
    })
    