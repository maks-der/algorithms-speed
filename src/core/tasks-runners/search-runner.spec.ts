import { SearchRunner } from './search-runner';

describe('class SearchRunner', () => {
    it('should generate an array of consecutive integers', () => {
        const searchRunner = new SearchRunner('Test', 1, 1000);
        const lengths = [10, 100, 1000];
        lengths.forEach((len) => {
            const array = searchRunner['generateArrayOfIntegers'](len);

            expect(array.length).toBe(len);
            array.forEach((num, i) => {
                expect(Number.isInteger(num)).toBe(true);
                expect(num).toBe(i);
            });
        });
    });
});
