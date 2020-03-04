const conditions = require('../type/conditions');
const valueTypes = require('../type/value');
const currencyHandler = require('../util/currencyHandler');
const inclusionHandler = require('../util/inclusionHandler');

function between(array, query){
    return array.filter((e)=> {
        let queryFirstValue = query.values[0];
        let querySecondValue = query.values[1];
        let arrayValue = e[query.key];

        if(query.type === valueTypes.currency){
            [queryFirstValue, querySecondValue, arrayValue]  = currencyHandler.convertToFloat([queryFirstValue, querySecondValue, arrayValue]);
        }

        return queryFirstValue <= arrayValue && querySecondValue >= arrayValue;
    });
}

function greaterThanOrEqual(array, query){
    return array.filter((e)=> {
        function condition(queryValue, arrayValue){
            return (query.condition.includes('equal')) ? queryValue <= arrayValue : queryValue < arrayValue;
        }

        return currencyHandler.runCondition(query, e[query.key], condition);
    });
}

function lessThanOrEqual(array, query){
    return array.filter((e)=> {
        function condition(queryValue, arrayValue){
            if(query.condition.includes('equal')){
                return queryValue >= arrayValue;
            }

            return queryValue > arrayValue;
        }
        
        return currencyHandler.runCondition(query, e[query.key], condition);
    });
}

function equalOrNot(array, query){
    function condition(queryValue, dataValue){
        return queryValue === dataValue;
    }
    
    return array.filter((e)=> {
        return inclusionHandler(e[query.key], query, condition);
    })
}


function includesOrNot(array, query){
    function condition(queryValue, dataValue){
        return dataValue.includes(queryValue);
    }

    return array.filter((e)=> {
        return inclusionHandler(e[query.key], query, condition);
    })
}

module.exports = {
    between,
    greaterThanOrEqual,
    equalOrNot,
    includesOrNot,
    lessThanOrEqual
}