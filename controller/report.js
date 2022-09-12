const express = require('express');
const Covid19Controller = require("./covid19");
const Covid19Model = require("../model/worldometer");

const getContinentReport = async (model) => {

    //filter out row/documents that do not entry in the content field
    const filter1 = {Continent: {$ne: '' }} ;
    const filter2 = {Continent: {$ne: null }};
    let result = await model.aggregate([

        //apply filters
        { $match: filter1},
        { $match: filter2 },
        {
            //calculate totals the selected fileds by continent
            $group: {
                _id: '$Continent', TotalPopulation: {
                    $sum: { "$cond" : [{ "$eq": ["$Population", '']}, 0, {$toInt : "$Population"}]},
                },
                _id: '$Continent', TotalCases: {
                    $sum: { "$cond" : [{ "$eq": ["$TotalCases", '']}, 0, {$toInt : "$TotalCases"}]},
                },
                _id: '$Continent', TotalRecovered: {
                    $sum: { "$cond" : [{ "$eq": ["$TotalRecovered", '']}, 0, {$toInt : "$TotalRecovered"}]},
                },
                _id: '$Continent', TotalTests: {
                    $sum: { "$cond" : [{ "$eq": ["$TotalTests", '']}, 0, {$toInt : "$TotalTests"}]},
                },
                _id: '$Continent', TotalDeaths: {
                    //$sum: {$toInt : "$TotalDeaths"}
                    $sum: { "$cond" : [{ "$eq": ["$TotalDeaths", '']}, 0, {$toInt : "$TotalDeaths"}]},
                },
            }
        },

        //remove the _id field from the output
        {$project: {
            _id:0,
            //rename _id field to continent in the output
            Continent: "$_id",
            TotalPopulation: 1,
            TotalCases: 1,
            TotalRecovered: 1,
            TotalTests: 1,
            TotalDeaths: 1,
        }}

    ]);

    return result

}

const getCountryReport = async (model) => {

    //filter out row/documents that do not entry in the content field
    const filter1 = {Continent: {$ne: '' }} ;
    const filter2 = {Continent: {$ne: null }};
    let result = await model.aggregate([

        //apply filters
        { $match: filter1},
        { $match: filter2 },
        //{ $match: {Continent: {"$eq": 'Africa' } }},
        {
            //calculate totals the selected fileds by continent
            $group: {
                _id: null, TotalCases: {
                    $sum: { "$cond" : [{ "$eq": ["$TotalCases", '']}, 0, {$toInt : "$TotalCases"}]},
                },
                _id: null, TotalTests: {
                    $sum: { "$cond" : [{ "$eq": ["$TotalTests", '']}, 0, {$toInt : "$TotalTests"}]},
                },
                _id: null, TotalRecovered: {
                    $sum: { "$cond" : [{ "$eq": ["$TotalRecovered", '']}, 0, {$toInt : "$TotalRecovered"}]},
                },
                _id: null, TotalDeaths: {
                    $sum: { "$cond" : [{ "$eq": ["$TotalDeaths", '']}, 0, {$toInt : "$TotalDeaths"}]},
                },
            }
        },

        //remove the _id field from the output
        {$project: {
            _id:0
        }}

    ]);


    return result

}

module.exports = {
    getCountryReport,
    getContinentReport,
}
