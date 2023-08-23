
export class TasksRunner {

    private tasks = new Map<string, (...args: any[]) => any>();
    private array: number[];

    constructor(
        private prefix: string,
        private times: number,
        arrLength: number,
    ) {
        this.array = this.generateArrayOfRandomIntegers(arrLength);
    }

    public addTask(task: (...args: any[]) => any): void {
        this.tasks.set(task.name, task);
    }

    public execute(): Map<string, number>[] {
        const res: Map<string, number>[] = [];

        for (let i = 0; i < this.times; i++) {
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

    private generateArrayOfRandomIntegers(length: number): number[] {
        let randomArray: number[] = [];

        for (let i = 0; i < length; i++) {
            let randomNumber = Math.floor(Math.random() * length) + 1;
            randomArray.push(randomNumber);
        }

        return randomArray;
    }

    private funcExecutionTime(func: () => any): number {
        const startTime = process.hrtime();
        func();
        const endTime = process.hrtime(startTime);

        return (endTime[0] * 1000) + (endTime[1] / 1e6);
    }
}