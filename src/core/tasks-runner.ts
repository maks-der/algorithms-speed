
export class TasksRunner {

    private tasks = new Map<string, (args: number[]) => number[]>();
    private array: number[];

    constructor(
        private prefix: string,
        private times: number,
        arrLength: number,
    ) {
        this.array = this.generateArrayOfRandomIntegers(arrLength);
    }

    public addTask(task: (args: number[]) => number[]): void {
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
        const randomArray: number[] = [];

        for (let i = 0; i < length;) {
            let randomNumber = Math.floor(Math.random() * length);
            if (randomNumber !== 0) randomNumber *= (Math.random() > 0.5 ? 1 : -1);

            if (randomArray.includes(randomNumber)) continue;
            randomArray.push(randomNumber);
            i++;
        }

        return randomArray;
    }

    private funcExecutionTime(func: () => number[]): number {
        const startTime = process.hrtime();
        func();
        const endTime = process.hrtime(startTime);

        return (endTime[0] * 1000) + (endTime[1] / 1e6);
    }
}