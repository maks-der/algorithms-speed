function generateRandomArray(length) {
  let randomArray = [];

  for (let i = 0; i < length; i++) {
    let randomNumber = Math.floor(Math.random() * length) + 1;
    randomArray.push(randomNumber);
  }

  return randomArray;
}
module.exports = {generateRandomArray};