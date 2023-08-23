
export interface IStat {
    title: string;
    max: number;
    average: number;
    min: number;
}

export class Statistics {

    public static getStats(data: Map<string, number>[]): IStat[] {
        const dividedData: Map<string, number[]> = this.divideByAlgorithm(data);
        return this.createStats(dividedData);
    };

    private static divideByAlgorithm(data: Map<string, number>[]): Map<string, number[]> {
        const res: Map<string, number[]> = new Map();

        for (const [name] of data[0]) {
            const time: number[] = [];
            data.forEach((map: Map<string, number>) => {
                if (map.has(name)) time.push(map.get(name) as number);
            });
            res.set(name, time);
        }

        return res;
    }

    private static createStats(dividedData: Map<string, number[]>): IStat[] {
        const stats: IStat[] = [];

        for (const [name, timeSeries] of dividedData) {
            stats.push({
                title: name,
                min: Math.min(...timeSeries),
                max: Math.max(...timeSeries),
                average: this.calculateAverage(timeSeries),
            });
        }

        return stats;
    }

    private static calculateAverage(numbers: number[]): number {
        if (numbers.length === 0) return 0;

        const sum = numbers.reduce((total, num) => total + num, 0);
        const average = sum / numbers.length;
        return average;
    }

}