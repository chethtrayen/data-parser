function validateQuery(query, condition){
    const restrictions = condition.restrictions;

    if(typeCheck(query.type, restrictions.types)){
        throw new Error('Query type no accepted');
    }

    if(restrictions.maxValueSize && valueSizeCheck(query.values, restrictions.maxValueSize)){
        throw new Error('Too many values');        
    }
}

function typeCheck(queryType, restrictionTypes){
    return !restrictionTypes.includes(queryType)
}   

function valueSizeCheck(queryValues, maxValueSize){
    return maxValueSize < queryValues.length;
}

module.exports = validateQuery;