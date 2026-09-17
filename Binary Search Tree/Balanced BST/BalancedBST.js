import mergeSort from "../../TOP excercises/fibAndMergeSort/MergeSort.js";
// import {BFS,BFS_Search,BFS_Search1} from "../BreadthFirstSearch.js"

function BSTNode(data, leftNode = null, rightNode = null, height = 0) {
  this.data = data;
  this.right = rightNode;
  this.left = leftNode;
  this.height = height;
}

// this Tree class is a BALANCED Binary search tree .
class Tree {
  constructor(array) {
    array = mergeSort(array);
    this.root = this.#buildTree(array);
  }

  // accepts a sorted array
  #buildTree(array, start = 0, end = array.length - 1) {
    if (end === start) {
      // means theres only one element
      return new BSTNode(array[start]);
    } else if (end - start === 1) {
      let smallest = array[start]; // cuz ascending order
      let biggest = array[start + 1]; // massive brain
      return new BSTNode(smallest, null, new BSTNode(biggest), 1);
    }

    // take the middle element as root
    // attach the right BST to root.
    // attach the
    let middleIndex = Math.floor((start + end) / 2);

    let leftSubtree = this.#buildTree(array, start, middleIndex - 1);
    let rightSubtree = this.#buildTree(array, middleIndex + 1, end);
    let parentElementHeight =
      1 + Math.max(leftSubtree.height, rightSubtree.height); // i dont see why + 1 needs to be added here so idc.

    let root = new BSTNode(
      array[middleIndex],
      leftSubtree,
      rightSubtree,
      parentElementHeight,
    );

    return root;
  }

  // returns a boolean ; if the node with the given value exists then return true else if not exists return false.
  includes(value) {
    let currentNode = this.root;

    while (currentNode.data !== value) {
      if (currentNode.left === null && currentNode.right === null) {
        // traversed to a leaf node;
        return false;
      }

      if (value > currentNode.data) {
        let isRightEmpty = currentNode.right === null; // if null then that means there literally isnt any number bigger than the currentNode.data which value is bigger than hence there CAN be not number bigger than value cuz the biggest is currentNode.data and currentNode.data <  value
        if (isRightEmpty) {
          return false;
        }
        currentNode = currentNode.right;
      } else {
        let isLeftEmpty = currentNode.left === null;

        if (isLeftEmpty) {
          return false;
        }
        currentNode = currentNode.left;
      }
    }

    // every other case is handled inside the while loop
    return true;
  }

  insert(value) {
    if (this.root === null) {
      this.root = new BSTNode(value);
      return;
    }
    let currentNode = this.root;

    while (currentNode.data !== value) {
      // we are essentially trying to find a node which has an empty place and also fits with the values criteria
      if (value > currentNode.data) {
        let isRightEmpty = currentNode.right === null;
        if (isRightEmpty) {
          currentNode.right = new BSTNode(value);
          break;
        } else {
          // the right child node isnt empty meaning the right subtree is the only plausible subtree that can hold the value
          currentNode = currentNode.right;
        }
      } else {
        let isLeftEmpty = currentNode.left === null;

        if (isLeftEmpty) {
          currentNode.left = new BSTNode(value);
          break;
        } else {
          currentNode = currentNode.left;
        }
      }
    }
    this.#updateHeight(value);
    this.#rebalance(value);
  }

  // deletes the node with the corresponding value and if it doesnt exist then do nothing
  // disclaimer : this makes the tree unbalanced on most cases
  deleteItem(value) {
    if (this.root === null) {
      // the BBST is empty
      console.log("the AVL tree is empty");
      return;
    }
    let lastSortedNode;
    if (value === this.root.data) {
      lastSortedNode = this.#deleteRoot();
      if (lastSortedNode === undefined) {
        // only happens when theres only one node in the tree meaning the root el was removed and now its completely empty
        return; // do nothing
      }
      this.#updateHeight(lastSortedNode.data);
      this.#rebalance(lastSortedNode.data);
      return;
    }

    let currentNode = this.root;
    let precedingNode; // this is the node that holds the reference to the next node ( currentNode ) .
    let subNodeDirection = "r"; // "r" or "l" meaning right or left

    while (currentNode.data !== value) {
      precedingNode = currentNode;
      if (currentNode.left === null && currentNode.right === null) {
        // traversed to a leaf node;
        return;
      }

      if (value > currentNode.data) {
        let isRightEmpty = currentNode.right === null; // if null then that means there literally isnt any number bigger than the currentNode.data which value is bigger than hence there CAN be not number bigger than value cuz the biggest is currentNode.data and currentNode.data <  value
        if (isRightEmpty) {
          return;
        }
        currentNode = currentNode.right;
        subNodeDirection = "right"; // on the right of the precedingNode currentNode exists
      } else {
        let isLeftEmpty = currentNode.left === null;

        if (isLeftEmpty) {
          return;
        }
        currentNode = currentNode.left;
        subNodeDirection = "left"; // on the right of the precedingNode currentNode exists
      }
    }
    // currentNode represents the node which has the corresponding value hence delete that node

    let isRightEmpty = currentNode.right === null; // if null then that means there literally isnt any number bigger than the currentNode.data which value is bigger than hence there CAN be not number bigger than value cuz the biggest is currentNode.data and currentNode.data <  value
    let isLeftEmpty = currentNode.left === null;
    lastSortedNode = precedingNode; // for the top 3 conditions this is the node the height path should be traversed till and specifies the nodes whose heights should be adjusted

    if (isRightEmpty && isLeftEmpty) {
      precedingNode[subNodeDirection] = null;
    }

    if (isRightEmpty && !isLeftEmpty) {
      // only right is empty
      precedingNode[subNodeDirection] = currentNode.left; // the original element is going to be cleaned up by the garbage collector
      // and because theres no right subtree of theElementTobeRemoved we can safely substitute theElementTobeRemoved with its left subtree hence "deleting" it
    } else if (isLeftEmpty && !isRightEmpty) {
      // only left is empty
      precedingNode[subNodeDirection] = currentNode.right; // the original element is going to be cleaned up by the garbage collector
    } else if (!isLeftEmpty && !isRightEmpty) {
      // both exist hence right becomes parent element ( root ) and its left is the original roots left subtree
      // in this case every rightNode after currentNode goes 1 level higher and their left's becomes their parents lefts.
      lastSortedNode = this.#sortDeletion(precedingNode, subNodeDirection);
    }
    this.#updateHeight(lastSortedNode.data);
    this.#rebalance(lastSortedNode.data);
  }

  // this should only be called when the parentNode has both left AND right nodes
  // repeats leftParent/right substitution
  // untill you hit the terminating condition ( parentNode doesnt contain a leftNode ).
  #sortDeletion(parentNode, childNodeDirection, deleteRoot = false) {
    // reminder : childNode's left and right are necessary existences
    let childNode = parentNode[childNodeDirection]; // guaranteed to exist
    let parentLeftNode;
    let subsequentNode;
    // TODO : integrate the root's functionality into this function later
    if (!deleteRoot) {
      // the common operation
      parentNode[childNodeDirection] = childNode.right; // cuz right and left BOTH exist
      parentLeftNode = childNode.left; // guaranteed to exist
      subsequentNode = parentNode[childNodeDirection];
    } else {
      this.root = childNode;
      parentLeftNode = parentNode.left;
      subsequentNode = this.root;
    }

    // currently the original child Node's left node is completely detached from the graph
    // parentNode holds both its orginal left and right nodes .

    // represents the parentsLeftNode which contains the subsequent node's toBeLeftNode.
    // thats its entire purpose ; to store its left Node which will be set to be the subsequent nodes left node .

    // there will always be a detached left subtree of the parentNode
    // there are 4 possible conditions for the leftParent/right substitution
    // right exists and left doesnt
    // left exists and right doesnt < - most complicated one
    // both left and right dont exist
    // both left and right exist.
    // key point : both parentLeftNode and subsequentNode are the same level subtree nodes of a parentNode.
    while (true) {
      let isRightEmpty = subsequentNode.right === null;
      let isLeftEmpty = subsequentNode.left === null;
      if (isRightEmpty && isLeftEmpty) {
        // if both are empty then we know that the subsequentItem is the right item of
        // the childNode hence its larger than the leftNode of the childNode
        // so just add the detached leftNode to the left of the subsequentNode
        subsequentNode.left = parentLeftNode;
        break;
      }
      if (!isRightEmpty && isLeftEmpty) {
        // if only right exists.
        subsequentNode.left = parentLeftNode;
        break;
      }
      if (!isLeftEmpty && isRightEmpty) {
        // cuz right is always going to be bigger than the left subtree
        subsequentNode.right = subsequentNode.left;
        subsequentNode.left = parentLeftNode;
        break;
      }
      if (!isLeftEmpty && !isRightEmpty) {
        let temp = subsequentNode.left;
        subsequentNode.left = parentLeftNode;
        parentLeftNode = temp;
        subsequentNode = subsequentNode.right;
      }
    }

    return subsequentNode;
  }

  // assumes root exists because its going to be called after the check
  #deleteRoot() {
    let isRightEmpty = this.root.right === null; // if null then that means there literally isnt any number bigger than the currentNode.data which value is bigger than hence there CAN be not number bigger than value cuz the biggest is currentNode.data and currentNode.data <  value
    let isLeftEmpty = this.root.left === null;

    if (isRightEmpty && isLeftEmpty) {
      this.root = null; // only the root el existed
      return;
    }
    let lastInvolvedNode = this.root; // for the first two conditions this is correct.

    if (isRightEmpty && !isLeftEmpty) {
      // only right is empty
      this.root = this.root.left; // the root element is going to be cleaned up by the garbage collector
      // and because theres no right subtree of theElementTobeRemoved we can safely substitute theElementTobeRemoved with its left subtree hence "deleting" it
    } else if (isLeftEmpty && !isRightEmpty) {
      // only left is empty
      this.root = this.root.right; // the root element is going to be cleaned up by the garbage collector
    } else if (!isLeftEmpty && !isRightEmpty) {
      // both arent empty.
      lastInvolvedNode = this.#sortDeletion(this.root, "right", true);
    }
    return lastInvolvedNode;
  }

  // will assume that the tree is filled with more than 1 node
  // updates all nodes on the heightPath of the node with the given value .
  // will assume that a node with the given value exists
  #updateHeight(value) {
    let currentNode = this.root;
    let nodesHeightStack = [];

    while (currentNode.data !== value) {
      // we are essentially trying to find a node which has an empty place and also fits with the values criteria
      if (value > currentNode.data) {
        let isRightEmpty = currentNode.right === null;
        if (isRightEmpty) {
          console.log(`node with the given value ${value} doesnt exist`);
          return;
        } else {
          // the right child node isnt empty meaning the right subtree is the only plausible subtree that can hold the value
          nodesHeightStack.push(currentNode);
          currentNode = currentNode.right;
        }
      } else {
        let isLeftEmpty = currentNode.left === null;

        if (isLeftEmpty) {
          console.log(`node with the given value ${value} doesnt exist`);
          return;
        } else {
          nodesHeightStack.push(currentNode);
          currentNode = currentNode.left;
        }
      }
    }
    nodesHeightStack.push(currentNode);

    // go through the stack and update the heights.
    for (let i = nodesHeightStack.length - 1; i >= 0; i--) {
      let node = nodesHeightStack[i];
      node.height = this.#getHeight(node);
    }
  }

  #getHeight(node) {
    let isRightEmpty = node.right === null;
    let isLeftEmpty = node.left === null;

    if (isLeftEmpty && isRightEmpty) {
      // if leaf node
      return 0;
    }

    let rightHeight = isRightEmpty ? 0 : node.right.height;
    let leftHeight = isLeftEmpty ? 0 : node.left.height;

    return 1 + Math.max(rightHeight, leftHeight);
  }

  // takes in a node
  // rebalances with the bottom up appraoch .
  // balancing the sub trees first and moving on till you reach the root el .
  // this will only traverse the heightPath of the given subtree / node .

  #rebalance(value) {
    let currentNode = this.root;
    let nodesHeightStack = [];

    while (currentNode.data !== value) {
      // we are essentially trying to find a node which has an empty place and also fits with the values criteria
      if (value > currentNode.data) {
        let isRightEmpty = currentNode.right === null;
        if (isRightEmpty) {
          console.log(`node with the given value ${value} doesnt exist`);
          return;
        } else {
          // the right child node isnt empty meaning the right subtree is the only plausible subtree that can hold the value
          nodesHeightStack.push(currentNode);
          currentNode = currentNode.right;
        }
      } else {
        let isLeftEmpty = currentNode.left === null;

        if (isLeftEmpty) {
          console.log(`node with the given value ${value} doesnt exist`);
          return;
        } else {
          nodesHeightStack.push(currentNode);
          currentNode = currentNode.left;
        }
      }
    }
    nodesHeightStack.push(currentNode);

    // go through the possible rebalancable nodes stack and do rotations on them if required.
    for (let i = nodesHeightStack.length - 1; i >= 0; i--) {
      let node = nodesHeightStack[i];
      let isLeftEmpty = currentNode.left === null;
      let isRightEmpty = currentNode.right === null;

      let rightHeight = isRightEmpty ? 0 : node.right.height;
      let leftHeight = isLeftEmpty ? 0 : node.left.height;

      let balanceFactor = leftHeight - rightHeight;
      if (balanceFactor > 1 || balanceFactor < -1) {
        console.log("caught ABSURD BALANCE FACTOR : ", balanceFactor);
      }

      if (balanceFactor > 1) {
        // left heavy
      } else if (balanceFactor < -1) {
        // right heavy
      }
    }
  }
}
export default Tree;
