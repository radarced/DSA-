import mergeSort from "./MergeSort.js";

describe("mergeSort", () => {
  test("handles an empty array", () => {
    expect(mergeSort([])).toEqual([]);
  });

  test("handles an array with a single element", () => {
    expect(mergeSort([73])).toEqual([73]);
  });

  test("handles an already sorted array", () => {
    expect(mergeSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  test("sorts an unsorted array with duplicate values", () => {
    expect(mergeSort([3, 2, 1, 13, 8, 5, 0, 1])).toEqual([
      0, 1, 1, 2, 3, 5, 8, 13,
    ]);
  });

  test("sorts an unsorted array of multi-digit numbers", () => {
    expect(mergeSort([105, 79, 100, 110])).toEqual([79, 100, 105, 110]);
  });
});
