export function fibonacciSearch(array: number[], target: number): number {
    let fibMMinus2 = 0;
    let fibMMinus1 = 1;
    let fibM = fibMMinus1 + fibMMinus2;

    while (fibM < array.length) {
        fibMMinus2 = fibMMinus1;
        fibMMinus1 = fibM;
        fibM = fibMMinus1 + fibMMinus2;
    }

    let offset = -1;

    while (fibMMinus2 > 0) {
        const i = Math.min(offset + fibMMinus2, array.length - 1);

        if (array[i] < target) {
            fibM = fibMMinus1;
            fibMMinus1 = fibMMinus2;
            fibMMinus2 = fibM - fibMMinus1;
            offset = i;
        }
        else if (array[i] > target) {
            fibM = fibMMinus2;
            fibMMinus1 -= fibMMinus2;
            fibMMinus2 = fibM - fibMMinus1;
        }
        else {
            return i;
        }
    }

    if (fibMMinus1 && array[offset + 1] == target) {
        return offset + 1;
    }

    return -1;
}
