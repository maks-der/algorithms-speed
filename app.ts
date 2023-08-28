import { Application } from './src/core/application';

console.clear();
console.log('> Start');

const app = new Application();
app.run();

console.log('> End');

// TODO: Fix error during: C++ search: array[60000], iteration: 16 interpolationSearch
// TODO: check bug with measuring search algorithms in JS
// TODO: refactor algorithms