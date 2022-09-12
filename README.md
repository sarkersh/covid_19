
# atlas
login: google mail2lamin@gmail.com
database: covid_19
username: Covid_19Data
password: HXBM7SOQxoWaVMzB


### validate 

    {
        $jsonSchema: {
            properties: {
                _id: {
                    bsonType: 'objectId'
                },
                'Country/Region': {
                    bsonType: 'string'
                },
                Continent: {
                    bsonType: 'int'
                },
                Population: {
                    bsonType: 'int'
                },
                TotalCases: {
                    bsonType: 'int'
                },
                TotalDeaths: {
                    bsonType: 'int'
                },
                TotalRecovered: {
                    bsonType: 'int'
                },
                TotalTests: {
                    bsonType: 'int'
                }
            }
        }
    }





# mongoose

const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = () => {
// Connecting to the database
mongoose
.connect(MONGO_URI, {
useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: false,
})
.then(() => {
console.log("Successfully connected to database");
})
.catch((error) => {
console.log("database connection failed. exiting now...");
console.error(error);
process.exit(1);
});
};