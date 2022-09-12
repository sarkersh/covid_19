const express = require('express');
const router = express.Router();

//import user controller and model
const reportController = require('../controller/report');
const UserModel = require('../model/user');
const Covid19Controller = require("../controller/covid19");
const Covid19Model = require("../model/worldometer");
const {getAuth}= require("../controller/utils");
const auth = require("../middleware/auth");

/* GET reports page. */
router.get('/', auth, async (req, res, next) => {

    const covidData =await Covid19Controller.getCovidData(Covid19Model, "");

    //const byContent = await Covid19Controller.getTotalsByContinent(Covid19Model)
    const globalTotals = await Covid19Controller.getGlobalTotals(Covid19Model)

    //set labels and data for charts in the report
    let globalLabels = []
    let globalData = []
    if(typeof globalTotals === 'object') {

        globalLabels = Object.keys(globalTotals[0])
        globalData = Object.values(globalTotals[0])

    }

    res.render('reports', {
        title: 'Home',
        auth: getAuth(),
        continent: "World Wide",
        globalLabels: ['Total Cases', 'Total Tests', 'Total Recovered', 'Total Deaths'],
        globalData: globalData,
        covidData: covidData,
        globalTotals: globalTotals[0]
    });

});


/* GET reports page by continent */
router.get('/continental', auth, async (req, res, next) => {

    const covidData =await Covid19Controller.getCovidData(Covid19Model, "");

    const byContent = await Covid19Controller.getTotalsByContinent(Covid19Model)
    const globalTotals = await Covid19Controller.getGlobalTotals(Covid19Model)

    let globalLabels = []
    let globalData = []
    if(typeof globalTotals === 'object') {

        globalLabels = Object.keys(globalTotals[0])
        globalData = Object.values(globalTotals[0])

    }

    res.render('reports-continental', {
        title: 'Home',
        byContent,
        auth: getAuth(),
        globalLabels: ['Total Cases', 'Total Tests', 'Total Recovered', 'Total Deaths'],
        globalData: globalData,
        covidData: covidData,
        globalTotals: globalTotals[0],

    });

});


/* GET reports page by continent */
router.get('/:continent', auth, async (req, res, next) => {

    //get continent you want to filter by
    let continent = req.params.continent

    let filter = ""
    if(continent){

        continent = continent.replace("-"," " )
        continent = continent.replace("_","/" )

        filter =  {Continent:`${continent}`}

    }else{

        //if no continent is selected then use Africa
        continent = "Africa"
    }

    const covidData =await Covid19Controller.getCovidData(Covid19Model, filter);

    const byContent = await Covid19Controller.getTotalsByContinent(Covid19Model)
    const globalTotals = await Covid19Controller.getGlobalTotals(Covid19Model,continent)

    let globalLabels = []
    let globalData = []
    if(typeof globalTotals === 'object') {

        globalLabels = Object.keys(globalTotals[0])
        globalData = Object.values(globalTotals[0])

    }

    res.render('reports', {
        title: 'Home',
        auth: getAuth(),
        globalLabels: ['Total Cases', 'Total Tests', 'Total Recovered', 'Total Deaths'],
        globalData: globalData,
        covidData: covidData,
        continent,
        globalTotals: globalTotals[0]
    });

});

module.exports = router;
