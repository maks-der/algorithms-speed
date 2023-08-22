const {funcExecutionTime}  = require( './javascript/scripts/time-counter.js');
const  {bubbleSort} = require("./javascript/algorithms/bubbleSort.js");
const {generateRandomArray} = require( "./javascript/scripts/arrays.js");
const addon = require('./build/Release/addon');


console.log('> Start')

const arr = generateRandomArray(10000);

const time1 = funcExecutionTime(() => bubbleSort(arr));

console.log(`JS: Bubble Sort time: ${time1} ms`);

const time2 = funcExecutionTime(() => addon.bubbleSort.call(arr));

console.log(`C++: Bubble Sort time: ${time2} ms`);

