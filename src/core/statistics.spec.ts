import { IStat, Statistics } from './statistics';

describe('class Statistics', () => {
    it('should calculate statistics correctly', () => {
        const data: Map<string, number>[] = [
            new Map([
                ['task1', 10],
                ['task2', 20],
                ['task3', 30],
            ]),
            new Map([
                ['task1', 15],
                ['task2', 25],
                ['task3', 35],
            ]),
            new Map([
                ['task1', 5],
                ['task2', 15],
                ['task3', 25],
            ]),
        ];

        const expectedStats: IStat[] = [
            { title: 'task1', min: 5, max: 15, average: 10 },
            { title: 'task2', min: 15, max: 25, average: 20 },
            { title: 'task3', min: 25, max: 35, average: 30 },
        ];

        const calculatedStats = Statistics.getStats(data);

        expect(calculatedStats).toEqual(expectedStats);
    });

    it('should handle empty input data', () => {
        const data: Map<string, number>[] = [];
        const calculatedStats = Statistics.getStats(data);

        expect(calculatedStats).toEqual([]);
    });
});