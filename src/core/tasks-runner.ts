type AlgorithmType = 'sort' | 'search';

// TODO: refactor this class into two
export class TasksRunner {

    private tasks = new Map<string, (...args: any) => any>();
    private array: number[];

    constructor(
        private prefix: string,
        private iterations: number,
        private arrLength: number,
        private algorithmType: AlgorithmType
    ) {
        this.array = (this.algorithmType === 'sort') ?
            this.generateArrayOfRandomIntegers(arrLength) :
            this.generateArrayOfIntegers(arrLength);
    }

    public addTask(task: (...args: any) => any): void {
        this.tasks.set(task.name, task);
    }

    public execute(): Map<string, number>[] {
        return (this.algorithmType === 'sort') ?
            this.execSortAlg() :
            this.execSearchAlg();
    }

    public execSortAlg(): Map<string, number>[] {
        const res: Map<string, number>[] = [];

        for (let i = 0; i < this.iterations; i++) {
            const map = new Map<string, number>();

            console.log(`${this.prefix}: array[${this.array.length}], iteration: ${i + 1}`);

            for (const [name, func] of this.tasks) {
                const copyArr = [...this.array];
                const execTime = this.funcExecutionTime(() => func(copyArr));
                map.set(name, execTime);
            }

            res.push(map);
        }
        return res;
    }

    public execSearchAlg(): Map<string, number>[] {
        const res: Map<string, number>[] = [];

        for (let i = 0; i < this.iterations; i++) {
            const map = new Map<string, number>();

            console.log(`${this.prefix}: array[${this.array.length}], iteration: ${i + 1}`);

            for (const [name, func] of this.tasks) {
                const target = this.getRandomInt(0, this.arrLength);
                const execTime = this.funcExecutionTime(() => func(this.array, target));
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

    private generateArrayOfIntegers(length: number): number[] {
        const array: number[] = [];

        for (let i = 0; i < length; i++) array.push(i);

        return array;
    }

    private funcExecutionTime(func: (...args: any) => any): number {
        const startTime = process.hrtime();
        func();
        const endTime = process.hrtime(startTime);

        return (endTime[0] * 1000) + (endTime[1] / 1e6);
    }

    private getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}