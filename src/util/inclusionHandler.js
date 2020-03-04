const valueTypes = require('../type/value');

function runCondition(arrayValue, query, condition){
    const result = query.values.some((queryValue) => condition(queryValue, arrayValue));
    return (query.condition.includes('not')) ? !result : result;
};

module.exports = runCondition;