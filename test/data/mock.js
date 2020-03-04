const conditions = require('../../src/type/conditions');
const valueTypes = require('../../src/type/value');

const query = [{
    key: 'name',
    values: ['ted'],
    type: valueTypes.TEXT,
    condition: conditions.INCLUDES.label
},
{
    key: 'salary',
    values: ['$50.00'],
    type: valueTypes.currency,
    condition: conditions.LESSTHAN.inclusiveLabel
}];


const data = [
    {
        name: 'ted1',
        age: 5,
        salary: '$10.00'
    },
    {
        name: 'ted2',
        age: 25,
        salary: '$30.31'

    },
    {
        name: 'ted3',
        age: 1,
        salary: '$30.30'

    },
    {
        name: 'ted4',
        age: 80,
        salary: '$40.00'

    },
    {
        name: 'ted5',
        age: 10,
        salary: '$50.00'

    }
];


module.exports = {
    data, query
}