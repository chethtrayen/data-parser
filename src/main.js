const conditions = require('./type/conditions');
const valueTypes = require('./type/value');
const validateQuery = require('./util/validation');
const filter = require('./logic/filter')

function runQuery(data, queries){
    return queries.reduce((acc, query)=>{
        const condition = query.condition;

        if(condition.includes(conditions.BEWTEEN.label)){
            validateQuery(query, conditions.BEWTEEN);
            return filter.between(acc, query);
        }
        if(condition.includes(conditions.EQUAL.label) && 
        !(condition.includes(conditions.GREATERTHAN.label) || condition.includes(conditions.LESSTHAN.label))){
            validateQuery(query, conditions.EQUAL);
            return filter.equalOrNot(acc, query);
        }
        if(condition.includes(conditions.INCLUDES.label)){
            validateQuery(query, conditions.INCLUDES);
            return filter.includesOrNot(acc, query);
        }  
        if(condition.includes(conditions.GREATERTHAN.label)){
            validateQuery(query, conditions.GREATERTHAN);
            return filter.greaterThanOrEqual(acc, query);
        }    
        if(condition.includes(conditions.LESSTHAN.label)){
            validateQuery(query, conditions.LESSTHAN);
            return filter.lessThanOrEqual(acc, query);
        }      
    }, data);
};


module.exports = runQuery;