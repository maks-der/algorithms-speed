
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
            // const info = [];

            console.log(`${this.prefix} - ${i + 1} iteration of array[${this.array.length}]`);

            for (const [name, func] of this.tasks) {
                const copyArr = [...this.array];

                // process.stdout.write(`${this.parseFuncName(name)} of array[${this.array.length}]... `);
                const execTime = this.funcExecutionTime(() => func(copyArr));
                // console.log(`Finished`);

                map.set(name, execTime);
                // info.push({
                //     info: `${this.prefix}: ${this.parseFuncName(name)}`,
                //     time: `${execTime} ms`
                // });
            }

            res.push(map);
            // console.table(info.map((i) => ({
            //     info: i.info.padEnd(52),
            //     time: i.time.padStart(14),
            // })));
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

    private parseFuncName(str: string): string {
        let res = '';
        for (let i = 0; i < str.length; i++) {
            if (/^[A-Z]*$/.test(str[i])) {
                res += ' ' + str[i].toLowerCase();
                continue;
            }
            res += str[i];
        }
        return res;
    }
}