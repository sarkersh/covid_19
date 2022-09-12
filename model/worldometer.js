
const mongoose = require('mongoose');
const { Schema } = mongoose;


const Covid19Schema = new Schema({
    "Country/Region": {
        type: String,
        require: true,
        min: 100,
        minLength:5
    },
    Continent: {type: String},
    Population: {type: Number},
    TotalCases: {type: Number},
    TotalDeaths: {type: Number},
    TotalRecovered:{type: Number},
    TotalTests  : {type: Number}

}, { collection: 'worldometer' });

const model  = mongoose.model("Covid19Model", Covid19Schema)

// module.exports = mongoose.model('Covid19Model',Covid19Schema )

//-- if u pass the actuat name of the collection then you wont need to specify collection name in schema defination
// module.exports = mongoose.model('worldometer_data',Covid19Schema )
module.exports = model