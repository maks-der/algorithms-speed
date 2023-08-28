# Algorithms speed comparison

This project uses the capability to develop Node.js addons using C++, subsequently analyzing the algorithmic execution time in the Node.js runtime environment for both JavaScript and C++.

#
### Algorithms

Note: The same case runs by all kinds of algorithms per one iteration.

- sort() and std::sort()
- Bubble Sort
- Selection Sort
- Insertion Sort
- Merge Sort
- Quicksort
- Heapsort
- Counting Sort
- Radix Sort

### Build

To get proper build of C++ addon:
1. use VSCode
1. change `includePath` in `c_cpp_properties.json` to path of your local `node-gyp`

### Start project

To build C++ addon, TypeScript to JS and run project use `npm start`
To build C++ addon and start TypeScript use `npm run start:ts`

### Process of execution
1. Build of C++ addon;
1. Compiling TypeScript to JavaScript;
1. Algorithms execution;
1. Saving result data;
1. Starting server at http://localhost:3000 with results charts.

### Configuration

You can change length of arrays for algorithms and number of iterations in config file.

Keep in mind limit of numbers in JS and integers in C++.

```json
{
    "sortIterations": 20,
    "searchIterations": 20,
    "sortArrayLength": [ 1000, 2000, 3000, 4000, 5000 ],
    "searchArrayLength": [ 10000, 50000, 100000, 150000, 200000 ]
}
```