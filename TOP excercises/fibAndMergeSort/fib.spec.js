import { fibonacci, fibRec } from "./fib.js";

describe("fibonacci Iterative Solution", () => {
  test("returns an array of the first 2 fib numbers", () => {
    expect(fibonacci(2)).toEqual([0, 1]);
  });

  test("returns an array of the first 10 fib numbers", () => {
    expect(fibonacci(10)).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
  });
});

describe("fibonacci recursive solution", () => {
  test("returns an array of the first 2 fib numbers", () => {
    expect(fibRec(2)).toEqual([0, 1]);
  });

  test("returns an array of the first 10 fib numbers", () => {
    expect(fibRec(10)).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
  });
});
