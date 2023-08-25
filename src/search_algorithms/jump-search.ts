
export function jumpSearch(array: number[], target: number): number {
    const size = array.length;
    let step = Math.sqrt(size); // Determine the block size
    let prev = 0;

    while (array[Math.min(step, size) - 1] < target) {
        prev = step;
        step += Math.sqrt(size);
        if (prev >= size) {
            return -1;
        }
    }

    while (array[prev] < target) {
        prev++;

        if (prev == Math.min(step, size)) {
            return -1;
        }
    }

    if (array[prev] == target) {
        return prev;
    }

    return -1;
}
