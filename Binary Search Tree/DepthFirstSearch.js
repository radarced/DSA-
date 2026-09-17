import Node from "./SearchTreeNode.js"

let root = new Node(0,new Node(2,new Node(3),new Node(1)),new Node(-1,new Node(50),new Node(-2)));
let superiorRootNode = new Node(0);
populateBinarySearchTree(superiorRootNode);

// choose a random number 
// populate that many elements on left
// populate that many elements on the right subtree

function populateBinarySearchTree(root,amountOfItems = undefined)
{  
  if(amountOfItems === undefined)
  {
    amountOfItems = Math.floor(Math.random() * 100);
  }
  if(amountOfItems === 0)
  {
    return;
  }

  
  let randomLeftNode = new Node(rand(100));
  let randomRightNode = new Node(rand(100));
  root.left = randomLeftNode;
  root.right = randomRightNode;

  populateBinarySearchTree(root.left,Math.floor(amountOfItems / 2)); // populate left side
  populateBinarySearchTree(root.right,Math.floor(amountOfItems / 2)); // populate right side 

}

function rand(n)
{
  return Math.floor(Math.random() * n);
}

DFS(superiorRootNode);
// pseudoCode : DLR
// process root element
// process left subtree
// process right subtree
function DFS(root)
{
  if(root === null || root === undefined)
  { // meaning either the tree is empty or we have reached the end of the tree
      return;
  }

  console.log(root.data);
  DFS(root.left);
  DFS(root.right);
}

// three properties of Node :
// - data 
// - right ( Node )
// - left ( Node )
