import Tree from "./BalancedBST.js";
import { Queue, QueueNode } from "../Queue.js";

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

function DFS(node) {
  let isLeftEmpty = node.left === null;
  let isRightEmpty = node.right === null;

  if (node === null) {
    return [];
  }
  if (isLeftEmpty && isRightEmpty) {
    return [node];
  }
  // its not a leaf node
  let array = [];
  array.push(node);
  let leftSubtreeArray = [];
  let rightSubtreeArray = [];
  if (!isLeftEmpty) {
    leftSubtreeArray = DFS(node.left);
  }
  if (!isRightEmpty) {
    rightSubtreeArray = DFS(node.right);
  }
  return array.concat(leftSubtreeArray, rightSubtreeArray);
}

function BFS(rootNode, callback) {
  // go level by level and add them into the queue
  let nodeQueue = new Queue(new QueueNode(rootNode));

  while (!nodeQueue.empty) {
    let toProcessNode = nodeQueue.getFirst();
    callback(toProcessNode.data.data);

    let leftNode = toProcessNode.data.left;
    let rightNode = toProcessNode.data.right;
    if (leftNode !== null) {
      nodeQueue.enqueue(new QueueNode(leftNode));
    }
    if (rightNode !== null) {
      nodeQueue.enqueue(new QueueNode(rightNode));
    }

    nodeQueue.dequeue(); // it has been processed
  }
}
// let testArray = createHugeArr(10000);

const testArray = [
  3, 5, 7, 10, 12, 15, 20, 11, 13, 14, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
];

let testBBST = new Tree(testArray);
// testBBST.insert(1);
// // prettyPrint(testBBST.root);
// testBBST.insert(2);
// // prettyPrint(testBBST.root);
// testBBST.insert(3);
// // prettyPrint(testBBST.root);
// testBBST.insert(4);

testBBST.insert(6);
prettyPrint(testBBST.root);

// console.log(testBBST.includes(10));
// let a = testBBST.constructTree_fromSubtrees(
//   testBBST.root.left,
//   testBBST.root.right,
//   testBBST.root,
// );
// prettyPrint(a);
for (let i = 2; i > -20; i--) {
  testBBST.insert(i);
  console.log(`PRETTY PRINT AT ${i} = `);
  prettyPrint(testBBST.root);
}

testBBST.deleteItem(20);
// prettyPrint(testBBST.root);

testBBST.insert(-20);
// prettyPrint(testBBST.root);
