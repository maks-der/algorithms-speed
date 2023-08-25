
export class ExecutionMeasurer {
    public static funcExecutionTime(func: (...args: any) => any): number {
        const startTime = process.hrtime();
        func();
        const endTime = process.hrtime(startTime);

        return (endTime[0] * 1000) + (endTime[1] / 1e6);
    }
}