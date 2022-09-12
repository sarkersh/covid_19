const express = require('express');
const router = express.Router();
//const mongoose = require('mongoose');
const Covid19Model = require('../model/worldometer');
const Covid19Controller = require('../controller/covid19');
const auth = require("../middleware/auth");
const userController = require('../controller/users');
const {getAuth} = require('../controller/utils');

/* GET home page. */
router.get('/', async (req, res, next) => {

  const covidData =await Covid19Controller.getCovidData(Covid19Model, "");

  const byContent = await Covid19Controller.getTotalsByContinent(Covid19Model)
  const globalTotals = await Covid19Controller.getGlobalTotals(Covid19Model)

  let globalLabels = []
  let globalData = []
  if(typeof globalTotals === 'object') {

    globalLabels = Object.keys(globalTotals[0])
    globalData = Object.values(globalTotals[0])

  }

  //console.log(scheduleData)
  res.render('index', {
    title: 'Home',
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    data: [12, 19, 3, 5, 2, 3],
    auth:getAuth(), //_auth,
    globalLabels: ['Total Cases', 'Total Tests', 'Total Recovered', 'Total Deaths'],
    globalData: globalData,
    covidData: covidData,
    globalTotals: globalTotals[0]
  });

});

module.exports = router;
