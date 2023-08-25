import { TasksRunner } from './tasks-runner';

describe('class TasksRunner', () => {
    it('should generate an array of random integers and all should be unique', () => {
        const tasksRunner = new TasksRunner('Test', 1, 1000, 'sort');
        const lengths = [10, 100, 1000, 10000, 100000];
        lengths.forEach((len) => {
            const randomArray = tasksRunner['generateArrayOfRandomIntegers'](len);

            expect(randomArray.length).toBe(len);
            expect(new Set(randomArray).size).toBe(len);
            randomArray.forEach((num) => {
                expect(Number.isInteger(num)).toBe(true);
            });
        });
    });

    it('should measure function execution time', () => {
        const tasksRunner = new TasksRunner('Test', 1, 1000, 'sort');
        const testFunction = () => {
            const res = [];
            for (let i = 0; i < 1000; i++) {
                res.push(Math.sqrt(i));
            }
            return res;
        };

        const executionTime = tasksRunner['funcExecutionTime'](testFunction);
        expect(executionTime).toBeGreaterThan(0);
    });
});
