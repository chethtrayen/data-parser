const regrex = require('./regex');
const valueTypes = require('../type/value');

function convertToFloat(currencyValues){
    return currencyValues.map((currency)=>parseFloat(regrex.currency.exec(currency)[0]));
}

function runCondition (query, arrayValue, condition) { 
    let queryValue = query.values[0];

    if(query.type === valueTypes.currency){
        [queryValue, arrayValue]  = convertToFloat([queryValue, arrayValue]);
    }
    return condition(queryValue, arrayValue)
}


module.exports = {
    convertToFloat,
    runCondition
}