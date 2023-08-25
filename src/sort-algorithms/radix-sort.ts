function getMax(arr: number[]): number {
    let max = arr[0];
    for (const num of arr) {
        if (num > max) {
            max = num;
        }
    }
    return max;
}

function countingSort(arr: number[], exp: number): void {
    const n = arr.length;
    const output = new Array(n).fill(0);
    const count = new Array(10).fill(0);

    for (let i = 0; i < n; i++) {
        count[Math.floor(arr[i] / exp) % 10]++;
    }

    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    for (let i = n - 1; i >= 0; i--) {
        output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
        count[Math.floor(arr[i] / exp) % 10]--;
    }

    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}

export function radixSort(arr: number[]): number[] {
    const max = getMax(arr);

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSort(arr, exp);
    }

    return arr;
}
