const { funcExecutionTime } = require('./src/time-counter.js');
const { generateRandomArray } = require("./src/arrays.js");
const {
    bubbleSort,
    jsSort,
    countingSort,
    heapSort,
    insertionSort,
    mergeSort,
    quickSort,
    radixSort,
    selectionSort,
} = require('./javascript/algorithms');
const addon = require('./build/Release/addon');


console.log('> Start')

const arr = generateRandomArray(10000);

const time1 = funcExecutionTime(() => bubbleSort(arr));
const time3 = funcExecutionTime(() => jsSort(arr));
const time5 = funcExecutionTime(() => countingSort(arr));
const time7 = funcExecutionTime(() => heapSort(arr));
const time9 = funcExecutionTime(() => insertionSort(arr));
const time11 = funcExecutionTime(() => mergeSort(arr));
const time13 = funcExecutionTime(() => quickSort(arr));
const time15 = funcExecutionTime(() => radixSort(arr));
const time17 = funcExecutionTime(() => selectionSort(arr));

console.log(`JS: bubble sort time: ${time1} ms`);
console.log(`JS: sort() time: ${time3} ms`);
console.log(`JS: counting sort time: ${time5} ms`);
console.log(`JS: heap sort time: ${time7} ms`);
console.log(`JS: insertion sort time: ${time9} ms`);
console.log(`JS: merge sort time: ${time11} ms`);
console.log(`JS: quick sort time: ${time13} ms`);
console.log(`JS: radix sort time: ${time15} ms`);
console.log(`JS: selection sort time: ${time17} ms`);



const time2 = funcExecutionTime(() => addon.bubbleSort.call(arr));
const time4 = funcExecutionTime(() => addon.countingSort.call(arr));
const time6 = funcExecutionTime(() => addon.heapSort.call(arr));
const time8 = funcExecutionTime(() => addon.insertionSort.call(arr));
const time10 = funcExecutionTime(() => addon.mergeSort.call(arr));
const time12 = funcExecutionTime(() => addon.quickSort.call(arr));
const time14 = funcExecutionTime(() => addon.radixSort.call(arr));
const time16 = funcExecutionTime(() => addon.selectionSort.call(arr));
const time18 = funcExecutionTime(() => addon.stdSort.call(arr));

console.log(`C++: bubble sort time: ${time2} ms`);
console.log(`C++: counting sort time: ${time4} ms`);
console.log(`C++: heap sort time: ${time6} ms`);
console.log(`C++: insertion sort time: ${time8} ms`);
console.log(`C++: merge sort time: ${time10} ms`);
console.log(`C++: quick sort time: ${time12} ms`);
console.log(`C++: radix sort time: ${time14} ms`);
console.log(`C++: selection sort time: ${time16} ms`);
console.log(`C++: std::sort() time: ${time18} ms`);

console.log('> End')