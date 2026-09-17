function mergeSort(arr) {
  if (arr.length === 0) {
    return [];
  } else if (arr.length === 1) {
    return arr; // [arr[0]]
  }

  let leftPartLength = Math.floor(arr.length / 2);
  //   let rightPartLength = arr.length - leftPartLength;

  let leftPart = arr.toSpliced(leftPartLength);
  let rightPart = arr.toSpliced(0, leftPartLength);

  let leftSortedPart = mergeSort(leftPart);
  let rightSortedPart = mergeSort(rightPart);

  let sortedArray = [];

  for (let i = 0, j = 0; i < leftSortedPart.length; i++) {
    let smallestLeftItem = leftSortedPart[i];
    let smallestRightItem = rightSortedPart[j];
    //   first clear out all items on the left

    if (smallestRightItem === undefined) {
      // smallestLeftItem will never be undefined because its in a standard array for loop
      // but smallestRightItem can be dealt with before the leftItem in that case every subseuqent iteration
      // will result in smallestRightItem being undefined or "nothing" hence just push the leftItems and continue
      sortedArray.push(smallestLeftItem);
      continue;
    }

    if (smallestLeftItem <= smallestRightItem) {
      sortedArray.push(smallestLeftItem);
    } else {
      j++; // move to the next item inside the rightPart because the smallest or current one has been "sorted"
      i--; // remain on the same iteration as the leftItem was not sorted
      sortedArray.push(smallestRightItem);
    }
    //  in the end two cases can happen :
    // either rightItems gets emptied first . ( which we have already handled in the above conditional block of smallestRightItem )
    // either LeftItems gets emptied first . ( in this case we have to check whether or not there still remains any leftItems and rightItems and if the condition is true then we append all rightItems in their respective order to sortedArray)
    let leftItemsSorted = i === leftSortedPart.length - 1;
    let rightItemsSorted = smallestRightItem === undefined;

    if (leftItemsSorted && !rightItemsSorted) {
      let leftRightItems = rightSortedPart.toSpliced(0, j);

      sortedArray = sortedArray.concat(leftRightItems); // left as in how many are yet to be sorted

      break; // all are sorted now
    }
  }

  return sortedArray;
}
// function createHugeArr(n) {
//   let arr = new Array(n);

//   for (let i = 0; i < arr.length; i++) {
//     arr[i] = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
//   }

//   return arr;
// }

// let hugeArr = createHugeArr(1000000);
// // it keeps trhowing an error saying invalid array length for bbigger numbers for some reason?.
// console.log(mergeSort(hugeArr));

export default mergeSort;
