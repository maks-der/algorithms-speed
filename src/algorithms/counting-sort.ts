export function countingSort(arr: number[]): number[] {
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;

    // Create an array to store the counts of each element
    const countArray = new Array(range).fill(0);

    // Count the occurrences of each element
    for (let num of arr) {
        countArray[num - min]++;
    }

    // Modify the count array to store the cumulative count
    for (let i = 1; i < range; i++) {
        countArray[i] += countArray[i - 1];
    }

    // Build the sorted output array
    const outputArray = new Array(arr.length);
    for (let num of arr) {
        outputArray[countArray[num - min] - 1] = num;
        countArray[num - min]--;
    }

    return outputArray;
}
