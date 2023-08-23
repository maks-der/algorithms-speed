export function generateRandomArray(length: number) {
  let randomArray: number[] = [];

  for (let i = 0; i < length; i++) {
    let randomNumber = Math.floor(Math.random() * length) + 1;
    randomArray.push(randomNumber);
  }

  return randomArray;
}