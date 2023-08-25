import { ExecutionMeasurer } from './execution-measurer';
import { IRunner } from './types';

export class SortRunner implements IRunner{

    private tasks = new Map<string, (...args: any) => any>();
    private array: number[];

    constructor(
        private prefix: string,
        private iterations: number,
        arrLength: number,
    ) {
        this.array = this.generateArrayOfRandomIntegers(arrLength);
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
                const copyArr = [...this.array];
                const execTime = ExecutionMeasurer.funcExecutionTime(() => func(copyArr));
                map.set(name, execTime);
            }

            res.push(map);
        }
        return res;
    }

    private generateArrayOfRandomIntegers(length: number): number[] {
        const randomArray: number[] = [];

        for (let i = 0; i < length;) {
            const randomNumber = Math.floor(Math.random() * length);
            // TODO: fix it. something wrong during radix sorting in C++ with negative values
            // if (randomNumber !== 0) randomNumber *= (Math.random() > 0.5 ? 1 : -1);

            if (randomArray.includes(randomNumber)) continue;
            randomArray.push(randomNumber);
            i++;
        }

        return randomArray;
    }
}