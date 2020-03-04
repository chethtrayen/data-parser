const valueTypes = require('./value');
const allTypes = [valueTypes.NUMBER, valueTypes.TEXT, valueTypes.currency];
const numericalTypes = [valueTypes.NUMBER, valueTypes.currency];

const conditions = {
    BEWTEEN: {
        label: 'between',
        restrictions: {
            types: numericalTypes,
            maxValueSize: 2,
        }
    },
    EQUAL: {
        label: 'equal',
        get exclusiveLabel() { return `not ${this.label}`},
        restrictions:{
            types: allTypes
        }
    },
    INCLUDES: {
        label: 'includes',
        get exclusiveLabel() { return `not ${this.label}`},
        restrictions: {
            types: [valueTypes.TEXT]
        }
    },
    GREATERTHAN: {
        label: 'greater than',
        get inclusiveLabel() { return `${this.label} and equal to` },
        restrictions: {
            types: numericalTypes,
            valueMaxSize: 1,
        }
    },
    LESSTHAN: {
        label: 'less than to',
        get inclusiveLabel() { return `${this.label} and equal to`},
        restrictions: {
            types: numericalTypes,
            valueMaxSize: 1,
        }
    }
};

module.exports = conditions;