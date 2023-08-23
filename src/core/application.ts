import { TasksRunner } from "./tasks-runner";
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
} from '../algorithms';
import { IStat, Statistics } from "./statistics";
import * as config from '../../app.config.json'
import { writeFileSync } from "fs";
import { join } from "path";
import { Server } from "../server";
// Should stay require
const addon = require('../../build/Release/addon');

export interface IArrayStats {
    arrayLength: number;
    stats: IStat[];
}

export class Application {

    public run(): void {
        const { arrayLength, iterations } = config;
        const jsResults: IArrayStats[] = [];
        const cppResults: IArrayStats[] = [];

        arrayLength.forEach((length: number) => {
            jsResults.push(this.runJsAlgorithms(iterations, length));
            cppResults.push(this.runCppAlgorithms(iterations, length));
        });

        const results = {
            js: jsResults,
            cpp: cppResults,
        }
        // console.log(results);
        this.saveResults(JSON.stringify(results));

        const server = new Server();
        server.start();
    }

    private runJsAlgorithms(iterations: number, arrayLength: number): IArrayStats {
        const tasksRunner = new TasksRunner('JS', iterations, arrayLength);

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

        return ({ arrayLength, stats: stats, });
    }

    private runCppAlgorithms(iterations: number, arrayLength: number): IArrayStats {
        const tasksRunner = new TasksRunner('C++', iterations, arrayLength);

        tasksRunner.addTask(function bubbleSort(arr) { addon.bubbleSort.call(arr) });
        tasksRunner.addTask(function countingSort(arr) { addon.countingSort.call(arr) });
        tasksRunner.addTask(function heapSort(arr) { addon.heapSort.call(arr) });
        tasksRunner.addTask(function insertionSort(arr) { addon.insertionSort.call(arr) });
        tasksRunner.addTask(function mergeSort(arr) { addon.mergeSort.call(arr) });
        tasksRunner.addTask(function quickSort(arr) { addon.quickSort.call(arr) });
        tasksRunner.addTask(function radixSort(arr) { addon.radixSort.call(arr) });
        tasksRunner.addTask(function selectionSort(arr) { addon.selectionSort.call(arr) });
        tasksRunner.addTask(function stdSort(arr) { addon.stdSort.call(arr) });

        const algResults = tasksRunner.execute();
        const stats = Statistics.getStats(algResults);
        // console.log(stats);
        return ({ arrayLength, stats: stats, });
    }

    private saveResults(data: string): void {
        writeFileSync(join(__dirname, '../server/temp/results.json'), data);
        return;
    }
}
