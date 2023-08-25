import { SortRunner } from './sort-runner';

describe('class SortRunner', () => {
    it('should generate an array of random integers and all should be unique', () => {
        const tasksRunner = new SortRunner('Test', 1, 1000);
        const lengths = [10, 100, 1000];
        lengths.forEach((len) => {
            const randomArray = tasksRunner['generateArrayOfRandomIntegers'](len);

            expect(randomArray.length).toBe(len);
            expect(new Set(randomArray).size).toBe(len);
            randomArray.forEach((num) => {
                expect(Number.isInteger(num)).toBe(true);
            });
        });
    });
});
