import Tree from "./BalancedBST.js";
function createHugeArr(n) {
  let arr = new Array(n);

  for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.floor(Math.random() * 1000);
  }

  return arr;
}

function prettyPrint(node, prefix = "", isLeft = true) {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(
    `${prefix}${isLeft ? "└── " : "┌── "}${node.data};h=${node.height}`,
  );
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
}

// let testArray = createHugeArr(10000);

const testArray = [
  3, 5, 7, 10, 12, 15, 20, 11, 13, 14, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
];

let testBBST = new Tree(testArray);
// console.log(testBBST.includes(10));
prettyPrint(testBBST.root);

for (let i = 2; i > -20; i--) {
  testBBST.insert(i);
}

testBBST.deleteItem(20);
prettyPrint(testBBST.root);
