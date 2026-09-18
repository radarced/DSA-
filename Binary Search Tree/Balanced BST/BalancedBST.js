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
    // this.#updateHeight(value); rebalance updates the heights on the height paths as it traverses anyway so doing it before is just useless because it doesnt accurately dictate current state.
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
    // this.#updateHeight(lastSortedNode.data);
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
        // ^ so in this case there can be an imbalanced tree
        break;
      }
      if (!isRightEmpty && isLeftEmpty) {
        // if only right exists.
        subsequentNode.left = parentLeftNode;
        // ^^ amazing so this can also cause an imbalance in the subtree nodes.
        break;
      }
      if (!isLeftEmpty && isRightEmpty) {
        // cuz right is always going to be bigger than the left subtree
        subsequentNode.right = subsequentNode.left;
        subsequentNode.left = parentLeftNode;
        // ^^ amazing so this can also cause an imbalance in the subtree nodes.

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
          `node with the given value ${value} doesnt exist`;
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
    // pushes the last node in.
    nodesHeightStack.push(currentNode);
    // go through the possible rebalancable nodes stack and do rotations on them if required.
    for (let i = nodesHeightStack.length - 1; i >= 0; i--) {
      let node = nodesHeightStack[i];
      let parentNode; // this is the parentNode which contains the currentNode or in this "node".
      if (i === 0) {
        // nodesHeightStack[0] is always the root Element
        parentNode = this.root;
      } else {
        parentNode = nodesHeightStack[i - 1];
      }

      let balanceFactor = this.#getBalance(node);

      // so theres never a bigger difference than 1 and smaller differece than -1 between the subtree's heights
      if (balanceFactor > 1) {
        // left heavy
        // in this case there's atleast 2 nodes on the left side
        // leftNode's balance will either be 1 or -1 for the parent element to be left heavy there needs to
        // be 1 more element on the left subtree and in extension of the left subtrees subtrees .

        let leftNode = node.left;
        let leftNodeBalance = this.#getBalance(leftNode);
        // console.log(parentNode, node, leftNode);
        if (leftNodeBalance === 1) {
          this.#left_left_rotation(parentNode, node);
        } else if (leftNodeBalance === -1) {
          this.#left_right_rotation(parentNode, node); // takes 1 el from leftSubtree and adds it to the right subtree.
        }

        // console.log(parentNode, node, leftNode);

        // prettyPrint(this.root);
      } else if (balanceFactor < -1) {
        // right heavy
        let rightNode = node.left;
        let rightNodeBalance = this.#getBalance(rightNode);

        // console.log(parentNode, node, rightNode);

        if (rightNodeBalance === 1) {
          this.#right_left_rotation(parentNode, node);
        } else if (rightNodeBalance === -1) {
          this.#right_right_rotation(parentNode, node); // takes 1 el from leftSubtree and adds it to the right subtree.
        } // prettyPrint(this.root);
        // console.log(parentNode, node, rightNode);
      }

      node.height = this.#getHeight(node);
    }
  }

  // leftSubtree and leftSubtree.left exists.
  // node is our "P" element parentNode is just there for pointer mechanics.
  #left_left_rotation(parentNode, node) {
    let leftSubtree;
    if (node === this.root) {
      // we're on the root el
      this.root = node.left;
      leftSubtree = node.left;
    } else {
      // ordinary elements

      let childNodeDirection = "right"; // purely exists for pointer mechanics
      if (node.data < parentNode.data) {
        childNodeDirection = "left";
      }
      // console.log(parentNode, node, childNodeDirection);
      parentNode[childNodeDirection] = node.left; // the nodes left node becomes the node moves a level up.
      leftSubtree = parentNode[childNodeDirection];
    }
    // P is detached from the tree
    // in P's place is now LeftSubtree (also detached).
    let isRightEmpty = this.#doesRightExist(leftSubtree);

    node.left = null;
    if (!isRightEmpty) {
      node.left = leftSubtree.right;
    } // ^^ the only case where right would be empty and this would be called
    // would be be when theres 2 els on the left of P and 0 on the right so no extra stuff needed.
    leftSubtree.right = node; // attach it back
    node.height = this.#getHeight(node);
    leftSubtree.height = this.#getHeight(leftSubtree);
  }

  // this function assumes that theres atleast 2 elements on the left subtree of the given node .
  // node represents our "P" element
  #left_right_rotation(parentNode, node) {
    let leftSubtree;
    if (node === this.root) {
      // we're on the root el
      this.root = node.left;
      leftSubtree = node.left;
    } else {
      // ordinary elements

      let childNodeDirection = "right"; // purely exists for pointer mechanics
      if (node.data < parentNode.data) {
        childNodeDirection = "left";
      }
      parentNode[childNodeDirection] = node.left; // the nodes left node becomes the node moves a level up.
      leftSubtree = parentNode[childNodeDirection];
    }
    // P is detached from the tree
    // in P's place is now LeftSubtree (also detached).
    let isLeftEmpty = this.#doesRightExist(leftSubtree);

    node.left = null;
    if (!isLeftEmpty) {
      node.left = leftSubtree.left;
    } // ^^ the only case where right would be empty and this would be called
    // would be be when theres 2 els on the left of P and 0 on the right so no extra stuff needed.
    leftSubtree.left = leftSubtree.right;
    leftSubtree.right = node; // attach it back
    // updating the height
    node.height = this.#getHeight(node);
    leftSubtree.height = this.#getHeight(leftSubtree);
  }

  // assumes theres two elements on the right of the node
  // node represents our "P" element.
  #right_right_rotation(parentNode, node) {
    let rightSubtree;
    if (node === this.root) {
      // we're on the root el
      this.root = node.right;
      rightSubtree = node.right;
    } else {
      // ordinary elements

      let childNodeDirection = "right"; // purely exists for pointer mechanics
      if (node.data < parentNode.data) {
        childNodeDirection = "left";
      }
      // console.log(parentNode, node, childNodeDirection);
      parentNode[childNodeDirection] = node.right; // the nodes left node becomes the node moves a level up.
      rightSubtree = parentNode[childNodeDirection];
    }
    // P is detached from the tree
    // in P's place is now rightSubtree (also detached).
    let isLeftEmpty = this.#doesRightExist(rightSubtree);

    node.right = null;
    if (!isLeftEmpty) {
      node.right = rightSubtree.left;
    } // ^^ the only case where right would be empty and this would be called
    // would be be when theres 2 els on the left of P and 0 on the right so no extra stuff needed.
    rightSubtree.left = node; // attach it back

    // heights updates
    node.height = this.#getHeight(node);
    rightSubtree.height = this.#getHeight(rightSubtree);
  }

  // this function assumes that theres atleast 2 elements on the right subtree of the given node .
  #right_left_rotation(parentNode, node) {
    let rightSubtree;
    if (node === this.root) {
      // we're on the root el
      this.root = node.right;
      rightSubtree = node.right;
    } else {
      // ordinary elements

      let childNodeDirection = "right"; // purely exists for pointer mechanics
      if (node.data < parentNode.data) {
        childNodeDirection = "left";
      }
      // console.log(parentNode, node, childNodeDirection);
      parentNode[childNodeDirection] = node.right; // the nodes left node becomes the node moves a level up.
      rightSubtree = parentNode[childNodeDirection];
    }
    // P is detached from the tree
    // in P's place is now rightSubtree (also detached).
    let isRightEmpty = this.#doesRightExist(rightSubtree);

    node.right = null;
    if (!isRightEmpty) {
      node.right = rightSubtree.right;
    } // ^^ the only case where right would be empty and this would be called
    // would be be when theres 2 els on the left of P and 0 on the right so no extra stuff needed.
    rightSubtree.right = rightSubtree.left;
    rightSubtree.left = node; // attach it back

    // heights updates
    node.height = this.#getHeight(node);
    rightSubtree.height = this.#getHeight(rightSubtree);
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

  #getBalance(node) {
    let isRightEmpty = node.right === null;
    let isLeftEmpty = node.left === null;

    if (isLeftEmpty && isRightEmpty) {
      // if leaf node
      return 0;
    }
    let rightHeight = isRightEmpty ? 0 : 1 + node.right.height;
    let leftHeight = isLeftEmpty ? 0 : 1 + node.left.height;

    return leftHeight - rightHeight; // if 2 or -2 then its a problem
  }

  // we assume that the given Whole tree is a bbst
  // this function assumes that leftSubtree and rightSubtree arent empty
  // returns a node which connects both of the lower level nodes .
  // its meant to put one of the subtrees 1 level higher and return that.
  constructTree_fromSubtrees(leftSubtree, rightSubtree, parentNode) {
    let balanceFactor = this.#getBalance(parentNode);

    switch (balanceFactor) {
      case 1:
        // leftSubtree has at minimum 2 elements based on the assumptions
        // left-heavy hence left is going to be the parentNode / precedingNode.
        let isLeftSubtreeLeftEmpty = this.#doesLeftExist(leftSubtree);
        let isLeftSubtreeRightEmpty = this.#doesRightExist(leftSubtree);
        console.log(
          leftSubtree,
          rightSubtree,
          isLeftSubtreeLeftEmpty,
          isLeftSubtreeRightEmpty,
        );
        if (!isLeftSubtreeLeftEmpty && !isLeftSubtreeRightEmpty) {
          // then we recursively call itself till we reach a condition where one of its subtrees are empty
          leftSubtree.left = this.constructTree_fromSubtrees(
            leftSubtree.left,
            leftSubtree.right,
            leftSubtree,
          );
          leftSubtree.right = rightSubtree; // in all conditions this happens
          leftSubtree.height = this.#getHeight(leftSubtree); // cuz of recursion this works
        } else if (!isLeftSubtreeRightEmpty && isLeftSubtreeLeftEmpty) {
          // if its left is empty
          leftSubtree.left = leftSubtree.right;
          leftSubtree.right = rightSubtree; // in all conditions this happens
        } else {
          leftSubtree.right = rightSubtree; // in all conditions this happens
        }

        return leftSubtree;
        break;
      case 0: // < - goes through the same code as case -1 cuz right looks better for convention.
      // reminder both right and left Subtrees are not empty
      case -1:
        // rightSubtree has at minimum 2 elements based on the assumptions
        // right-heavy hence left is going to be the parentNode / precedingNode.
        let isRightSubtreeLeftEmpty = this.#doesLeftExist(rightSubtree);
        let isRightSubtreeRightEmpty = this.#doesRightExist(rightSubtree);

        if (!isRightSubtreeLeftEmpty && !isRightSubtreeRightEmpty) {
          // then we recursively call itself till we reach a condition where one of its subtrees are empty
          rightSubtree.right = this.constructTree_fromSubtrees(
            rightSubtree.left,
            rightSubtree.right,
            rightSubtree,
          );
          rightSubtree.left = leftSubtree; // in all conditions this happens
          rightSubtree.height = this.#getHeight(rightSubtree); // cuz of recursion this works
        } else if (!isRightSubtreeLeftEmpty && isRightSubtreeRightEmpty) {
          // if its right is empty and left exists
          rightSubtree.right = rightSubtree.left;
          rightSubtree.left = leftSubtree; // in all conditions this happens
        } else {
          rightSubtree.left = leftSubtree; // in all conditions this happens
        }

        return rightSubtree;
        break;
    }
  }

  #doesLeftExist(node) {
    return node.left === null;
  }

  #doesRightExist(node) {
    return node.right === null;
  }
}

export default Tree;
// so one of the core themes / repetitive functionalities that ive seen is :
// construction of a tree based upon two subtrees between which there is valid balance
// factor . so we're essentially going to construct a common tree / node from these subtrees
// in such a way that theyre valid .
// for this you choose the top left or top right node of the subtrees depending on whos the superior
// one.
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
