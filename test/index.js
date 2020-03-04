const {expect} = require('chai');
const mock = require('./data/mock');
const filter = require('../src/logic/filter');
const value = require('../src/type/value');
const conditions = require('../src/type/conditions');

function sortAndStringify(obj){
    return JSON.stringify(obj.sort());
}

describe('Jawn parser test', ()=>{
    describe('Between query test', ()=>{
        let mockData = mock.data;
        const [minValue, maxValue] = [1,50];
        const key = 'age';
        let mockQuery = {
            key,
            values: [minValue, maxValue],
            type: value.NUMBER,
            condition: conditions.BEWTEEN.label
        }

        before(()=>{
            mockData = mockData.filter((e)=> minValue<=e[key] && maxValue>=e[key]);
        })
        it('should return data between ages 1-50', ()=>{
            const filterResult = filter.between(mock.data, mockQuery).sort().toString();
            
            mockData = mockData.sort().toString();
            expect(filterResult).to.eq(mockData);
        });
    });

    describe('Equal query test', ()=>{
        
        let mockData = mock.data;
        const equalValue = ['ted1', 'ted2']
        const key = 'name';
        let mockQuery = {
            key,
            values: equalValue,
            type: value.TEXT,
            condition: conditions.EQUAL.label
        }

        before(()=>{
            mockData = mockData.filter((e)=>equalValue.some((f) => e[key] === f));
        })
        it('should return data that equals ted1 and ted2', ()=>{
            const filterResult = filter.equalOrNot(mock.data, mockQuery).sort().toString();
            
            mockData = mockData.sort().toString();
            expect(filterResult).to.eq(mockData);
        });
    });

    describe('Equal query test', ()=>{
        
        let mockData = mock.data;
        const notEqualValue = ['ted1', 'ted2']
        const key = 'name';
        let mockQuery = {
            key,
            values: notEqualValue,
            type: value.TEXT,
            condition: conditions.EQUAL.exclusiveLabel
        }

        before(()=>{
            mockData = mockData.filter((e)=>!notEqualValue.some((f) => {return e[key] === f}));
        })
        it('should return data that equals ted1 and ted2', ()=>{
            const filterResult = sortAndStringify(filter.equalOrNot(mock.data, mockQuery));
            mockData = sortAndStringify(mockData);
            expect(filterResult).to.eq(mockData);
        });
    });

});