import { ExecutionMeasurer } from './execution-measurer';

describe('class ExecutionMeasurer', () => {
    it('should measure function execution time', () => {
        const testFunction = () => {
            const res = [];
            for (let i = 0; i < 1000; i++) {
                res.push(Math.sqrt(i));
            }
            return res;
        };

        const executionTime = ExecutionMeasurer.funcExecutionTime(testFunction);
        expect(executionTime).toBeGreaterThan(0);
    });
});
