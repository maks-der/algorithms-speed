
export function interpolationSearch(array: number[], target: number): number {

    let left = 0;
    let right = array.length - 1;

    while (left <= right && target >= array[left] && target <= array[right]) {
        if (left == right) {
            if (array[left] == target) {
                return left;
            }
            return -1;
        }

        const pos = left + ((target - array[left]) * (right - left)) / (array[right] - array[left]);

        if (array[pos] == target) {
            return pos;
        }
        else if (array[pos] < target) {
            left = pos + 1;
        }
        else {
            right = pos - 1;
        }
    }

    return -1;
}
