import { TasksRunner } from './tasks-runner';
import {
    bubbleSort,
    jsSort,
    countingSort,
    heapSort,
    insertionSort,
    mergeSort,
    quickSort,
    radixSort,
    selectionSort,
} from '../sort-algorithms';
import { IStat, Statistics } from './statistics';
import * as config from '../../app.config.json';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { Server } from '../server';
import { binarySearch, exponentialSearch, fibonacciSearch, interpolationSearch, jumpSearch, linearSearch } from '../search_algorithms';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const addon = require('../../build/Release/addon'); // Should stay require

export interface IArrayStats {
    arrayLength: number;
    stats: IStat[];
}

export interface IResultsData{
    sortJs: IArrayStats[],
    sortCpp: IArrayStats[],
    searchJs: IArrayStats[],
    searchCpp: IArrayStats[],
}

export class Application {

    public run(): void {
        const { arrayLength, iterations } = config;
        const jsSortResults: IArrayStats[] = [];
        const cppSortResults: IArrayStats[] = [];
        const jsSearchResults: IArrayStats[] = [];
        const cppSearchResults: IArrayStats[] = [];

        arrayLength.forEach((length: number) => {
            jsSortResults.push(this.runJsSortAlgorithms(iterations, length));
            cppSortResults.push(this.runCppSortAlgorithms(iterations, length));

            jsSearchResults.push(this.runJsSearchAlgorithms(iterations, length));
            cppSearchResults.push(this.runCppSearchAlgorithms(iterations, length));
        });

        const results: IResultsData = {
            sortJs: jsSortResults,
            sortCpp: cppSortResults,
            searchJs: jsSearchResults,
            searchCpp: cppSearchResults,
        };

        console.log(results);
        
        this.saveResults(JSON.stringify(results));

        const server = new Server();
        server.start();
    }

    private runJsSortAlgorithms(iterations: number, arrayLength: number): IArrayStats {
        const tasksRunner = new TasksRunner('JS sort', iterations, arrayLength, 'sort');

        tasksRunner.addTask(bubbleSort);
        tasksRunner.addTask(countingSort);
        tasksRunner.addTask(heapSort);
        tasksRunner.addTask(insertionSort);
        tasksRunner.addTask(mergeSort);
        tasksRunner.addTask(quickSort);
        tasksRunner.addTask(radixSort);
        tasksRunner.addTask(selectionSort);
        tasksRunner.addTask(jsSort);

        const algResults = tasksRunner.execute();
        const stats = Statistics.getStats(algResults);
        // console.log(stats);

        return ({ arrayLength, stats: stats });
    }

    private runCppSortAlgorithms(iterations: number, arrayLength: number): IArrayStats {
        const tasksRunner = new TasksRunner('C++ sort', iterations, arrayLength, 'sort');

        tasksRunner.addTask(function bubbleSort(arr: number[]) { addon.bubbleSort.call(arr); });
        tasksRunner.addTask(function countingSort(arr: number[]) { addon.countingSort.call(arr); });
        tasksRunner.addTask(function heapSort(arr: number[]) { addon.heapSort.call(arr); });
        tasksRunner.addTask(function insertionSort(arr: number[]) { addon.insertionSort.call(arr); });
        tasksRunner.addTask(function mergeSort(arr: number[]) { addon.mergeSort.call(arr); });
        tasksRunner.addTask(function quickSort(arr: number[]) { addon.quickSort.call(arr); });
        tasksRunner.addTask(function radixSort(arr: number[]) { addon.radixSort.call(arr); });
        tasksRunner.addTask(function selectionSort(arr: number[]) { addon.selectionSort.call(arr); });
        tasksRunner.addTask(function stdSort(arr: number[]) { addon.stdSort.call(arr); });

        const algResults = tasksRunner.execute();
        const stats = Statistics.getStats(algResults);
        // console.log(stats);
        return ({ arrayLength, stats: stats, });
    }

    private runJsSearchAlgorithms(iterations: number, arrayLength: number): IArrayStats {
        const tasksRunner = new TasksRunner('JS search', iterations, arrayLength, 'search');

        tasksRunner.addTask(binarySearch);
        tasksRunner.addTask(exponentialSearch);
        tasksRunner.addTask(fibonacciSearch);
        tasksRunner.addTask(interpolationSearch);
        tasksRunner.addTask(jumpSearch);
        tasksRunner.addTask(linearSearch);

        const algResults = tasksRunner.execute();
        const stats = Statistics.getStats(algResults);

        return ({ arrayLength, stats: stats });
    }

    private runCppSearchAlgorithms(iterations: number, arrayLength: number): IArrayStats {
        const tasksRunner = new TasksRunner('C++ search', iterations, arrayLength, 'search');

        tasksRunner.addTask(function binarySearch(arr: number[], target: number) { addon.binarySearch.call(arr, target); });
        tasksRunner.addTask(function exponentialSearch(arr: number[], target: number) { addon.exponentialSearch.call(arr, target); });
        tasksRunner.addTask(function fibonacciSearch(arr: number[], target: number) { addon.fibonacciSearch.call(arr, target); });
        tasksRunner.addTask(function interpolationSearch(arr: number[], target: number) { addon.interpolationSearch.call(arr, target); });
        tasksRunner.addTask(function jumpSearch(arr: number[], target: number) { addon.jumpSearch.call(arr, target); });
        tasksRunner.addTask(function linearSearch(arr: number[], target: number) { addon.linearSearch.call(arr, target); });

        const algResults = tasksRunner.execute();
        const stats = Statistics.getStats(algResults);

        return ({ arrayLength, stats: stats, });
    }

    private saveResults(data: string): void {
        writeFileSync(join(__dirname, '../server/temp/results.json'), data);
        return;
    }
}
