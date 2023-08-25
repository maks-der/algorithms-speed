export interface IRunner {
    addTask(task: (...args: any) => any): void;
    execute(): Map<string, number>[];
}