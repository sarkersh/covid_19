if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

const getCovidData = async (model,filter) => {
    const res = await model.find({
            Continent: 'Africa'
        }
    )
    return res
}

const getAuth = () => {
    let _auth = {
        isAuthorized:0,
        isAdmin:0
    }
    if(localStorage.getItem('currentToken')){
        _auth.isAuthorized = 1
    }
    if(localStorage.getItem('isAdmin')){
        _auth.isAdmin = 1
    }
    return _auth
}

const formatTime2 = (time) => {
    return time.toLocaleString('en-GB', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    })
}

const formatTime = (time) => {

    //create a placeholder date part to pass to new Date object
    const fixedDatePart = '2021-12-12'
    return new Intl.DateTimeFormat('en-GB',
        {
            hour12: true,
            hour: 'numeric',
            minute: 'numeric'
        }).format(new Date(fixedDatePart + ' ' + time));

}

module.exports = {
    formatTime,
    formatTime2,
    getAuth
}