function fibonacci(n) {
  if (n <= 0) {
    return;
  }

  if (n === 2) {
    return [0, 1];
  } else if (n === 1) {
    return [0];
  }
  // the following code will execute where 3 < n < any Integer < - actually no but i dont care about that much type validation

  let fibNums = [0, 1]; // the first two fibItems

  fibNums.length = n; // allocating the space required

  for (let i = 2; i < fibNums.length; i++) {
    fibNums[i] = fibNums[i - 1] + fibNums[i - 2];
  }

  return fibNums;
}

// each fibRec call returns the fib Numbers array at that index .

function fibRec(n) {
  if (n === 2) {
    // its always going to come to back to 1
    return [0, 1];
  }

  let previousNums = fibRec(n - 1);
  // ^^ just add the last or the current fibNumber to the array at this now hold all the
  // fibNums till nth index.
  previousNums.push(
    previousNums[previousNums.length - 1] +
      previousNums[previousNums.length - 2],
  );

  return previousNums;
}

console.log(fibonacci(100000));

export { fibonacci, fibRec };
