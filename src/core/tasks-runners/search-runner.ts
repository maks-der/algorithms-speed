import { ExecutionMeasurer } from './execution-measurer';
import { IRunner } from './types';


export class SearchRunner implements IRunner {

    private tasks = new Map<string, (...args: any) => any>();
    private array: number[];

    constructor(
        private prefix: string,
        private iterations: number,
        private arrLength: number,
    ) {
        this.array = this.generateArrayOfIntegers(arrLength);
    }

    public addTask(task: (...args: any) => any): void {
        this.tasks.set(task.name, task);
    }

    public execute(): Map<string, number>[] {
        const res: Map<string, number>[] = [];

        for (let i = 0; i < this.iterations; i++) {
            const map = new Map<string, number>();

            console.log(`${this.prefix}: array[${this.array.length}], iteration: ${i + 1}`);

            for (const [name, func] of this.tasks) {
                const target = this.getRandomInt(0, this.arrLength);
                const execTime = ExecutionMeasurer.funcExecutionTime(() => func(this.array, target));
                map.set(name, execTime);
            }

            res.push(map);
        }
        return res;
    }

    private generateArrayOfIntegers(length: number): number[] {
        const array: number[] = [];

        for (let i = 0; i < length; i++) array.push(i);

        return array;
    }

    private getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}